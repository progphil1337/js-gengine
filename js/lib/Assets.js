class Assets {

    isReady = false;
    cache = [];
    loadedCount = 0;
    requiredCount = 0;

    constructor(fileMap) {
        this.fileMap = fileMap;
    }

    ready(callback) {

        const fileMapArr = Object.entries(this.fileMap);
        this.requiredCount = fileMapArr.length;

        for (const [name, file] of fileMapArr) {

            const fileEnding = file.split('.').pop();
            switch (fileEnding) {
                case 'png':
                    this.loadImage(name, file, callback);
                    break;

                case 'json':
                    this.loadFile(name, file, callback);
                    break;
            }

        }
    }

    get(name) {
        return this.cache[name];
    }

    loadFile(name, file, callback) {
        const httpRequest = new XMLHttpRequest();
        httpRequest.overrideMimeType('application/json');
        httpRequest.open('GET', file, true);
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                this.loadedCount++;

                this.cache[name] = JSON.parse(httpRequest.responseText);

                if (this.loadedCount === this.requiredCount) {
                    this.isReady = true;
                    callback();
                }
            }
        };

        httpRequest.send(null);
    }

    loadImage(name, file, callback) {
        const image = new Image();
        image.onload = () => {
            this.loadedCount++;

            if (this.loadedCount === this.requiredCount) {
                this.isReady = true;
                callback();
            }
        };

        image.src = file;
        this.cache[name] = image;
    }

}