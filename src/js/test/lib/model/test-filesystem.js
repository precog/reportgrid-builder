define([
    "lib/model/filesystem"
  , "lib/util/arrays"
  , "lib/util/assert"
],

function(filesystem, arrays, assert) {
  function createComplexFS() {
    return filesystem({
      types : {
        folder : {
          container : ["folder", "datasource"]
        },
        datasource : {
          container : ["column"]
        },
        column : {
          container : false
        }
      },
      defaultType : "folder"
    });
  }

  return function() {
    module("File System");

    test("Basic", function() {
      var fs = filesystem();

      ok(fs.has("/", "folder"), "has path /");
      ok(!fs.has("/fake", "folder"), "doesn't have fake path /fake");

      ok(!fs.add("/my/nested/path", "folder"), "cannot create path in folder that is not defined");
      ok(fs.add("/my/nested/path", "folder", true), "create recursive path");
      ok(fs.has("/my", "folder"), "has path /my");
      ok(fs.has("/my/nested", "folder"), "has path /my/nested");
      ok(fs.has("/my/nested/path", "folder"), "has path /my/nested/path");

      ok(fs.remove("/my/nested", "folder"), "remove higher level folder");
      ok(fs.has("/my", "folder"), "path /my should be still alive");
      ok(!fs.has("/my/nested", "folder"), "path /my/nested should have been removed");
      ok(!fs.has("/my/nested/path", "folder"), "path /my/nested/path should have been removed");
    });

    test("Naming", function() {
      var fs = filesystem();
      fs.add("a/b", "folder", true);
      ok(fs.has(""), "empty / no slashes");
      ok(fs.has("a"), "no slashes");
      ok(fs.has("/a"), "leading slash");
      ok(fs.has("a/"), "trailing slash");
      ok(fs.has("/a/"), "slash on both sides");

      ok(fs.has("a/b"), "no terminal slashes");
      ok(fs.has("/a/b"), "leading and middle slashes");
      ok(fs.has("a/b/"), "trailing and middle slashes");
      ok(fs.has("/a/b/"), "leading and trailing slashes");
    });

    test("Removal", function() {
      var fs = filesystem();
      fs.add("a/b/c", "folder", true);
      fs.add("a/b/d", "folder", false);
      fs.add("a/e", "folder", false);

      ok(fs.remove("a", "folder"), "remove must return true when succeeds");
      ok(!fs.remove("a", "folder"), "remove must return false when fails");
    });

    test("Traversal", function() {
      var fs = filesystem();
      fs.add("a/b/c", "folder", "folder");
      fs.add("a/b/d", "folder", "folder");
      fs.add("a/e", "folder", "folder");
      
      var list = fs.list("/");
      equal(1, list.length, "base path must contain only one element");
      equal("a", list[0].path, "base path only contain a");

      list = fs.list("/a");
      equal(2, list.length, "path /a must contain only two elements");
      equal("b", list[0].path, "path /a contains b");
      equal("e", list[1].path, "path /a contains e");

      list = fs.list("/a/b");
      equal(2, list.length, "path /a/b must contain only two elements");
      equal("c", list[0].path, "path /a/b contains c");
      equal("d", list[1].path, "path /a/b contains d");
    });

    test("Events", function () {
      var fs = filesystem(),
          expected = ["/a", "/a/b", "/a/b/c"],
          added = [],
          removed = [];

      $(fs).on("added", function(e, path, type) {
        equal(type, "folder");
        added.push(path);
      });

      $(fs).on("removed", function(e, path, type) {
        equal(type, "folder");
        removed.push(path);
      });

      fs.add("a/b/c", "folder", true);
      equal(arrays.diff(expected, added).length, 0, "added elements should match expected");

      fs.remove("a");
      equal(arrays.diff(expected, removed).length, 0, "removed elements should match expected");
    });

    test("Name Validation", function() {
      var fs = filesystem();
      throws(function() { fs.add("/name:"); }, "invalid name raises exception");
    });

    test("Type Is Container", function() {
      var fs = createComplexFS();

      ok(fs.typeIsContainer("folder"));
      ok(fs.typeIsContainer("datasource"));
      ok(!fs.typeIsContainer("column"));
    });

    test("Type Can Contain", function() {
      var fs = createComplexFS();

      ok(fs.typeCanContain("folder", "folder"));
      ok(fs.typeCanContain("folder", "datasource"));
      ok(!fs.typeCanContain("folder", "column"));

      ok(!fs.typeCanContain("datasource", "folder"));
      ok(!fs.typeCanContain("datasource", "datasource"));
      ok(fs.typeCanContain("datasource", "column"));

      ok(!fs.typeCanContain("column", "folder"));
      ok(!fs.typeCanContain("column", "datasource"));
      ok(!fs.typeCanContain("column", "column"));
    });

    test("Type Container For", function() {
      var fs = createComplexFS();

      equal(fs.typeContainerFor("folder"), "folder");
      equal(fs.typeContainerFor("datasource"), "folder");
      equal(fs.typeContainerFor("column"), "datasource");
    });

    test("Mixed Contents", function() {
      var fs = createComplexFS();

      ok(fs.add("/f",      "folder"), "add folder to folder");
      ok(fs.add("/s",      "datasource"), "add datasource to root");
      ok(fs.has("/s",      "datasource"), "check datasource");
      ok(fs.add("/s/c",    "column"), "add column to datasource");
      ok(fs.add("/f/s",    "datasource"), "add datasource to folder");
      ok(fs.add("/f/s/c",  "column"), "add column to sub datasource");
      ok(!fs.add("/c",     "column"), "don't add column to root");
      ok(!fs.add("/f/c",   "column"), "don't add column to folder");
      ok(!fs.add("/s/c/c", "column"), "don't add column to column");
      ok(!fs.add("/s/c/f", "column"), "don't add folder to column");
      ok(!fs.add("/s/c/s", "datasource"), "don't add datasource to column");
      ok(!fs.add("/s/s",   "datasource"), "don't add datasource to datasource");
      ok(!fs.add("/s/f",   "folder"), "don't add folder to datasource");
    });

    test("Deep Recursive Creation", function() {
      var fs = createComplexFS();

      ok(fs.add("/f/s/c", "column", true), "add column and containers");
      ok(fs.has("/f", "folder"), "folder exists");
      ok(fs.has("/f/s", "datasource"), "datasource exists");
      ok(fs.has("/f/s/c", "column"), "column exists");
    });

    test("Remove Must Not Remove Non-Children", function() {
      var fs = filesystem();

      fs.add("/a");
      fs.add("/ab");
      fs.remove("/a");
      ok(fs.has("/ab"));
    });

    test("Test Case Insensitivty", function() {
      var fs = filesystem({ caseSensitive : false });

      fs.add("/a");
      ok(fs.has("/a"));
      ok(fs.has("/A"));
    });

    test("Test Case Sensitivty", function() {
      var fs = filesystem({ caseSensitive : true });

      fs.add("/a");
      ok(fs.has("/a"));
      ok(!fs.has("/A"));
    });
  }
});