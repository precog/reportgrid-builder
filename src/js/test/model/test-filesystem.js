define([
  "model/filesystem",
  "util/arrays"
],

function(filesystem, arrays) {
  return function() {
    module("File System");

    test("Dir Basic", function() {
      var fs = filesystem();

      ok(fs.hasDir("/"), "has path /");
      ok(!fs.hasDir("/fake"), "doesn't have fake path /fake");

      fs.addDir("/my/nested/path");
      ok(fs.hasDir("/my"), "has path /my");
      ok(fs.hasDir("/my/nested"), "has path /my/nested");
      ok(fs.hasDir("/my/nested/path"), "has path /my/nested/path");

      fs.removeDir("/my/nested");
      ok(fs.hasDir("/my"), "path /my should be still alive");
      ok(!fs.hasDir("/my/nested"), "path /my/nested should have been removed");
      ok(!fs.hasDir("/my/nested/path"), "path /my/nested/path should have been removed");
    });
/*
    test("Dir Naming", function() {
      var fs = filesystem();
      fs.addDir("a/b");
      ok(fs.hasDir(""));
      ok(fs.hasDir("a"));
      ok(fs.hasDir("/a"));
      ok(fs.hasDir("/a/"));

      ok(fs.hasDir("a/b"));
      ok(fs.hasDir("/a/b"));
      ok(fs.hasDir("a/b/"));
      ok(fs.hasDir("/a/b/"));
    });

    test("Dir Removal", function() {
      var fs = filesystem();
      fs.addDir("a/b/c");
      fs.addDir("a/b/d");
      fs.addDir("a/e");

      var r = fs.removeDir("a");
      ok(r, "removeDir must return true when succeeds");
      r = fs.removeDir("a");
      ok(r, "removeDir must return false when fails");
    });
    
    test("Dir Traversal", function() {
      var fs = filesystem();
      fs.addDir("a/b/c");
      fs.addDir("a/b/d");
      fs.addDir("a/e");
      
      var list = fs.listDir("/");
      equal(1, list.length, "base path must contain only one element");
      equal("a", list[0], "base path only contain a");

      list = fs.listDir("/a");
      equal(2, list.length, "path /a must contain only two elements");
      equal("b", list[0], "path /a contains b");
      equal("e", list[1], "path /a contains e");

      list = fs.listDir("/a/b");
      equal(2, list.length, "path /a/b must contain only two elements");
      equal("c", list[0], "path /a/b contains c");
      equal("d", list[1], "path /a/b contains d");
    })
*/
//    test("Path Events", function () {
//      var fs = filesystem();
//      ok(false, "not implemented");
      /*
       var r = fs.removeDir("a", function(removed) {
       var expected = ["/a/b/c", "/a/b/d", "/a/e", "/"],
       diff = arrays.diff(expected, removed);
       equal(0, diff.length, "expected contains more elements " + diff);
       diff = arrays.diff(removed, expected)
       equal(0, diff.length, "removed contains more elements " + diff);
       });
       */

//    });
/*
    test("Node Basic", function() {
      var fs = filesystem();
      ok(false, "not implemented");

      
    });

    test("Node Naming", function() {
      var fs = filesystem();
      ok(false, "not implemented");
      
      
    });

    test("Node Removal", function() {
      var fs = filesystem();
      ok(false, "not implemented");


    });

    test("Node Events", function () {
      var fs = filesystem();
      ok(false, "not implemented");


    });
    */
  }
});