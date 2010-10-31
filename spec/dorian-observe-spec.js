describe("Dorian", function() {
    describe("observe", function() {
        it("should return a Dorian object when calling via .observe", function(){
            var dorian = Dorian.observe({interval: 3000});
            expect(dorian instanceof Dorian).toBe(true);
        });

        it("should throw an error if the interval is not a number, or is 0", function() {
            expect(function(){ Dorian.observe() }).toThrow("Invalid argument. interval should be a number");
            expect(function(){ Dorian.observe({}) }).toThrow("Invalid argument. interval should be a number");
            expect(function(){ Dorian.observe({interval: "100"}) }).toThrow("Invalid argument. interval should be a number");
            expect(function(){ Dorian.observe({interval: undefined}) }).toThrow("Invalid argument. interval should be a number");
            expect(function(){ Dorian.observe({interval: NaN}) }).toThrow("Invalid argument. interval should be a number");
            expect(function(){ Dorian.observe({interval: null}) }).toThrow("Invalid argument. interval should be a number");
            expect(function(){ Dorian.observe({interval: {}}) }).toThrow("Invalid argument. interval should be a number");
            expect(function(){ Dorian.observe({interval: 0}) }).toThrow("Invalid argument. interval should be greater than 0");
        });

        describe("when observing an element", function() {
            var tag;
            beforeEach(function(){
                tag = document.createElement("div");
                tag.setAttribute("title", "Sat Oct 30 18:35:18 -0500 2010");
                tag.setAttribute("class", "time-relative");
                var text = document.createTextNode("Some text");
                tag.appendChild(text);
                document.body.appendChild(tag);
            });

            afterEach(function(){
                document.body.removeChild(tag);
            });

            it("should execute the callback function inmediately after calling the observe method", function() {
                var dorian = Dorian.observe({
                    elements : document.getElementsByClassName("time-relative"),
                    interval : 100000,
                    getTime  : function(element) { return element.getAttribute("title") },
                    formatTime  : function(relativeTime) { return relativeTime + " ago" }
                });
                expect(tag.innerHTML.match(/ago/)).toBeTruthy();
            });

        });
    });
});
