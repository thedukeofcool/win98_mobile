export class HTTPManager {
    constructor() { }

    fetchPlainText(url) {
        var request = new XMLHttpRequest();
        request.onload = function () {
            if (request.readyState == 4 && request.status == 200) {
                return {
                    successState: true,
                    state: 4,
                    status: 200,
                    response: request.responseText
                }
            }
            else {
                return {
                    successState: false,
                    state: this.readyState,
                    status: this.status,
                    response: null
                }
            }
        };
        request.open("GET", url, true);
        request.send();
    }

    fetchJSONData(url) {
        var reqRes = this.fetchPlainText(url);
        if (reqRes == null) {
            return reqRes;
        }
        reqRes.response = JSON.parse(reqRes.response);
        return reqRes;
    }

    fetchDataURL(encodedText, type, format) {
        var reqRes = this.fetchPlainText("data:" + type + ";" + format + "," + encodedText);
        return reqRes;
    }
}