describe("Dorian", function() {
    describe("age", function() {
        describe("parsing the date", function() {
            var tag;
            beforeEach(function() {
                tag = document.createElement("div");
                tag.setAttribute("class", "time-relative");
                document.body.appendChild(tag);
            });
            afterEach(function() {
                document.body.removeChild(tag);
            });

            it("raises an error if the time cannot be parsed", function() {
                expect(function() {
                    Dorian.observe({
                        observable : document.getElementsByClassName("time-relative"),
                        interval : 60000,
                        getTime : function() { return "Unparseable time"; }
                    });
                }).toThrow("Time could not be parsed");
            });

            // It sticks to the specification on https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/parse
            // Any other format is not covered by this library, and probably will vary across implementations/browsers
            it("parses the Date if passed as the IETF standard RFC 1123", function() {
                validDates = [
                    "Mon, 25 Dec 1995 13:30:00 GMT",
                    "25 Dec 1995",
                    "Monday 25 December 1995",
                    "1995",
                    "Thu, 01 Jan 1970 00:00:00 GMT-0400"
                ];
                for(var i = 0; i < validDates.length; i++) {
                    expect(function() { Dorian.observe({
                            observable : document.getElementsByClassName("time-relative"),
                            interval : 60000,
                            getTime : function() { return validDates[i]; }
                        });
                    }).not.toThrow();
                }
            })

            it("succesfully returns the difference of time between the actual time and the passed time", function() {
                withDeLorean(function() {
                    var currentTime = new Date();
                    var futureDate = new Date(currentTime.getTime() + (60 * 60 * 1000)); // One hour in the future

                    // Sets up the fake time in the title attribute of the div
                    tag.setAttribute("title", futureDate.toString());

                    DeLorean.advance(60 * 60 * 1000);
                    Dorian.observe({
                        observable : document.getElementsByClassName("time-relative"),
                        interval : 30000, // Each 30 seconds
                        getTime : function(element) { return element.getAttribute("title"); },
                        formatTime : function(text) { return text + " ago" }
                    });

                    expect(tag.innerHTML).toBe("less than a minute ago");
                    DeLorean.advance(20 * 1000); // at 20 seconds
                    expect(tag.innerHTML).toBe("less than a minute ago");
                    DeLorean.advance(40 * 1000); // at 60 seconds
                    expect(tag.innerHTML).toBe("1 minute ago");
                    DeLorean.advance(29 * 60 * 1000); // at 30 minutes
                    expect(tag.innerHTML).toBe("30 minutes ago");
                    DeLorean.advance(30 * 60 * 1000); // at 60 minutes
                    expect(tag.innerHTML).toBe("about 1 hour ago");
                    DeLorean.advance(60 * 60 * 1000); // at 120 minutes
                    expect(tag.innerHTML).toBe("about 2 hours ago");
                });
            });
        });
    })
});


