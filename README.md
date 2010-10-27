dorian-gray
========

**Dorian** makes your pages' dates grow old. Call it on static content, and watch as the time goes by...

> *But this picture will remain always young. It will never be older than this particular day of June. . . . If it was only the other way! If it was I who were to be always young, and the picture that were to grow old!*

   ---   Work in progress ---
--------------------------------

Dorian is a framework-agnostic javascript library to provide aging to the dates on your pages.

    var dorian = new Dorian({
      className      = "relative-date",
      getTime        = function(element) { element.title },
      interval       = 60000,
      includeSeconds = true
    });

* Note: this is still a draft *

