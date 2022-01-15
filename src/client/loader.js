class AssetLoader {
    static assets = {
        unloaded: [],
        audio: {}
    };

    static async loadSound(id,source) {
        return new Promise((res,rej) => {
            const audio = new Audio(source);

            //When audio is loaded, create new function to play audio
            audio.oncanplaythrough = () => {
                this.assets.audio[id] = audio;
                res(audio);
            }

            //Reject on audio error
            audio.onerror = (e) => {
                rej("Failed to load with code "+e.code);
            }
        })
    }

    static async loadAssets() {
        let concurrentPromises = [];
        let failedPromises = 0;

        //Queue promises

        for(const asset of this.assets.unloaded) {

            asset.src = "assets/"+asset.type+"/"+asset.src;
            let promise = null;

            switch(asset.type) {
                case "audio":
                    promise = this.loadSound(asset.id, asset.src);
                    break;

                default: 
                    console.warn("Tried to load unknown asset \""+asset.type+"\"");
            }

            //Error handling
            promise.catch((e) => {
                console.warn("Unable to load asset "+asset.id+"\n",e);
                failedPromises++;
            });
            concurrentPromises.push(promise);
        }

        //Clear queue
        this.assets.unloaded = [];

        //Wait for all promises to resolve
        for await(let promise of concurrentPromises) {
            await promise;
        }

        return this.assets;
    }
}

module.exports = AssetLoader;