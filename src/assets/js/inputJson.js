/**
 * Kümmert sich darum JSON Daten aus verschiedenen Quellen zu laden.
 */

export default {
    lastJsonData: {},
    loadPlaceholderJson() {
        console.log('Getting Test Json');
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(json => { this.lastJsonData = json; return json })
            .then(json => { console.log('result:', json); });
        console.log(this.lastJsonData);
    },
    loadLargeJson() {
        fetch('https://github.com/json-iterator/test-data/raw/master/large-file.json')
            .then(response => response.json())
            .then(json => this.lastJsonData = json)
    }
}