function Dorian(options) {
    var _options = options || {};
    var observable = _options.elements || [];
    var interval = _options.interval;
    var getTime = _options.getTime || function(element) { return element.innerHTML; };
    var formatTime = _options.formatTime || function(relative) { return relative; };

    if(typeof(observable) === 'undefined') {
        this._observed = [];
    }
    if(typeof(interval) !== 'number' || isNaN(interval)) {
        throw "Invalid argument. interval should be a number";
    } else {
        if(interval === 0) {
            throw "Invalid argument. interval should be greater than 0";
        }
    }
    this._observerTimerID = null;
    this.observe = function() {
        for(var i = 0; i < observable.length; i++) {
            var element = observable[i];
            element.innerHTML = formatTime("5 minutes");
            console.log(element);
        };
    };
}
Dorian.observe = function(options) {
    var dorian = new Dorian(options);
    dorian.observe();
    return dorian;
};
Dorian.distanceOfTimeInWords = function(secondsEllapsed, includeSeconds, options) {
    var _secondsEllapsed = secondsEllapsed;
    var _includeSeconds = includeSeconds;
    var _options = options || {};

    var distanceInMinutes = Math.round(secondsEllapsed / 60);
    var distanceInSeconds = Math.round(secondsEllapsed);
    var appendTime = function(quantity, period) {
        if(quantity === 1) {
            return "1 " + period;
        } else {
            return quantity + " " + period + "s";
        }
    };

    if(distanceInMinutes < 2) {
        if(includeSeconds){
            if(distanceInSeconds < 5) { return "less than 5 seconds"; }
            else if(distanceInSeconds < 10) { return "less than 10 seconds"; }
            else if(distanceInSeconds < 20) { return "less than 20 seconds"; }
            else if(distanceInSeconds < 40) { return "half a minute"; }
            else if(distanceInSeconds < 60) { return "less than a minute"; }
            else { return "1 minute"; }
        } else {
            if(distanceInMinutes == 0) { return "less than a minute"; }
            else { return "1 minute"; }
        }
    } else if (distanceInMinutes < 45) {
        return distanceInMinutes + " minutes";
    } else if (distanceInMinutes < 90) {
        return "about 1 hour";
    } else if (distanceInMinutes < 1440) {
        return "about " + Math.round(distanceInMinutes / 60) + " hours";
    } else if (distanceInMinutes < 2880) {
        return "1 day";
    } else if (distanceInMinutes < 43200) {
        return Math.round(distanceInMinutes / 1440) + " days";
    } else if (distanceInMinutes < 86400) {
        return "1 month"
    } else if (distanceInMinutes < 525960) {
        return Math.floor(distanceInMinutes / 43200) + " months";
    } else {
        var distanceInYears = Math.floor(distanceInMinutes / 525960);
        var remainder = distanceInMinutes % 525960;

        if(remainder < 129600) { // 3 months
            return "about " + appendTime(distanceInYears, "year");
        } else if(remainder < 388800) { // 9 months
            return "over " + appendTime(distanceInYears, "year");
        } else {
            return "almost " + appendTime((distanceInYears + 1), "year")
        }
    }
}
