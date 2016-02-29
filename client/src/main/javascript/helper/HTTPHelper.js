export default class HTTPHelper {

    /**
     * Returns query parameter of given name or "Not found" if the parameter doesn't exist.
     *
     * @param {string} name
     * @returns {string}
     */
    static getQueryParameter(name) {
        var result = "Not found",
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === name) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }

}