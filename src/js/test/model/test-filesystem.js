define([
  "model/filesystem",
  "util/arrays"
],

function(filesystem, arrays) {
  return function() {
    module("File System");

    test("Basic", function() {
      var fs = filesystem();

      ok(fs.has("/", "folder"), "has path /");
      ok(!fs.has("/fake", "folder"), "doesn't have fake path /fake");

      ok(!fs.add("/my/nested/path", "folder"), "cannot create path in folder that is not defined");
      ok(fs.add("/my/nested/path", "folder", "folder"));
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
      fs.add("a/b", "folder", "folder");
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
      fs.add("a/b/c", "folder", "folder");
      fs.add("a/b/d", "folder", "folder");
      fs.add("a/e", "folder", "folder");

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

      fs.add("a/b/c", "folder", "folder");
      equal(arrays.diff(expected, added).length, 0, "added elements should match expected");

      fs.remove("a");
      equal(arrays.diff(expected, removed).length, 0, "removed elements should match expected");
    });
  }
});