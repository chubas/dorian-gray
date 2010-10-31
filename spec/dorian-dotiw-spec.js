var dotiw = Dorian.distanceOfTimeInWords;
var seconds = function(s) {
    return s;
};
var minutes = function(m) {
    return seconds(60) * m;
};
var hours = function(h) {
    return minutes(60) * h;
};
var days = function(d) {
    return hours(24) * d;
};
var months = function(m) {
    return days(30) * m;
};
var years = function(y) {
    return days(365.25) * y;
};

// Following the tests at http://github.com/rails/rails/blob/master/actionpack/test/template/date_helper_test.rb
// NOTE: Rails takes into account daylight saving times. Dorian doesn't [yet], so tests are slightly modified.

describe("Dorian", function() {
    describe("distanceOfTimeInWords", function() {

        describe("less than a minute", function(){
            describe("with seconds = false", function(){
                it("returns 'less than a minute'", function() {
                    expect(dotiw(seconds(0))).toBe("less than a minute");
                    expect(dotiw(seconds(29))).toBe("less than a minute");
                });
            });
            describe("with seconds = true", function(){
                it("returns the amount of seconds passed", function(){
                    expect(dotiw(seconds(0), true)).toBe("less than 5 seconds");
                    expect(dotiw(seconds(4), true)).toBe("less than 5 seconds");
                    expect(dotiw(seconds(5), true)).toBe("less than 10 seconds");
                    expect(dotiw(seconds(9), true)).toBe("less than 10 seconds");
                    expect(dotiw(seconds(10), true)).toBe("less than 20 seconds");
                    expect(dotiw(seconds(19), true)).toBe("less than 20 seconds");
                    expect(dotiw(seconds(20), true)).toBe("half a minute");
                    expect(dotiw(seconds(39), true)).toBe("half a minute");
                    expect(dotiw(seconds(40), true)).toBe("less than a minute");
                    expect(dotiw(seconds(59), true)).toBe("less than a minute");
                    expect(dotiw(seconds(60), true)).toBe("1 minute");
                    expect(dotiw(seconds(89), true)).toBe("1 minute");
                });
            });
        });

        describe("one minute", function(){
            it("returns '1 minute'", function(){
                expect(dotiw(seconds(30))).toBe("1 minute");
                expect(dotiw(minutes(1) + seconds(29))).toBe("1 minute");
            });
        });

        describe("more than one minute and less than 44 minutes", function(){
            it("returns the number of minutes", function() {
                expect(dotiw(minutes(1) + seconds(30))).toBe("2 minutes");
                expect(dotiw(minutes(44) + seconds(29))).toBe("44 minutes");
            });
        });

        describe("more than 44 minutes but less than an hour and a half", function(){
            it("returns 'about 1 hour'", function(){
                expect(dotiw(minutes(44) + seconds(30))).toBe("about 1 hour");
                expect(dotiw(hours(1) + minutes(29) + seconds(29))).toBe("about 1 hour");
            });
        });

        describe("more than an hour but less than a day", function() {
            it("returns the number of hours", function(){
                expect(dotiw(hours(1) + minutes(29) + seconds(30))).toBe("about 2 hours");
                expect(dotiw(hours(23) + minutes(59) + seconds(29))).toBe("about 24 hours");
            });
        });

        describe("one day", function(){
            it("returns 'one day'", function(){
                expect(dotiw(hours(23) + minutes(59) + seconds(30))).toBe("1 day");
                expect(dotiw(hours(47) + minutes(59) + seconds(29))).toBe("1 day");
            });
        });

        describe("more than one day but less than a month", function(){
            it("returns the number of days", function(){
                expect(dotiw(hours(47) + minutes(59) + seconds(30))).toBe("2 days");
                expect(dotiw(days(2) + hours(12))).toBe("3 days");
                expect(dotiw(days(29) + hours(23) + minutes(59) + seconds(29))).toBe("30 days");
            });
        });

        describe("one month", function(){
            it("returns '1 month'", function(){
                expect(dotiw(days(29) + hours(23) + minutes(59) + seconds(30))).toBe("1 month");
                expect(dotiw(days(59) + hours(23) + minutes(59) + seconds(29))).toBe("1 month");
            });
        });

        describe("many months", function(){
            it("returns the number of months", function(){
                expect(dotiw(days(59) + hours(23) + minutes(59) + seconds(30))).toBe("2 months");
                expect(dotiw(years(1) - seconds(31))).toBe("12 months");
            });
        });

        describe("near one year", function(){
            it("returns 'about 1 year'", function(){
                expect(dotiw(years(1) - seconds(30))).toBe("about 1 year");
                expect(dotiw(years(1) + months(3) - days(1))).toBe("about 1 year");
            });

            it("returns 'over 1 year'", function(){
                expect(dotiw(years(1) + months(6))).toBe("over 1 year");
            });
        });

        describe("many years", function(){
            it("returns the number of years", function(){
                expect(dotiw(years(2) - months(3) + days(1))).toBe("almost 2 years");
                expect(dotiw(years(2) + months(3) - days(1))).toBe("about 2 years");
                expect(dotiw(years(2) + months(3) + days(1))).toBe("over 2 years");
                expect(dotiw(years(2) + months(9) - days(1))).toBe("over 2 years");
                expect(dotiw(years(2) + months(9) + days(1))).toBe("almost 3 years");

                expect(dotiw(years(5) - months(3) + days(1))).toBe("almost 5 years");
                expect(dotiw(years(5) + months(3) - days(1))).toBe("about 5 years");
                expect(dotiw(years(5) + months(3) + days(1))).toBe("over 5 years");
                expect(dotiw(years(5) + months(9) - days(1))).toBe("over 5 years");
                expect(dotiw(years(5) + months(9) + days(1))).toBe("almost 6 years");

                expect(dotiw(years(10) - months(3) + days(1))).toBe("almost 10 years");
                expect(dotiw(years(10) + months(3) - days(1))).toBe("about 10 years");
                expect(dotiw(years(10) + months(3) + days(1))).toBe("over 10 years");
                expect(dotiw(years(10) + months(9) - days(1))).toBe("over 10 years");
                expect(dotiw(years(10) + months(9) + days(1))).toBe("almost 11 years");
            });
        });

    });
});
