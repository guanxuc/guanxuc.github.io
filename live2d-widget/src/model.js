import showMessage from "./message.js";
import randomSelection from "./utils.js";

class Model {
    constructor(config) {
        let { apiPath, cdnPath } = config;
        let useCDN = false;
        if (typeof cdnPath === "string") {
            useCDN = true;
            if (!cdnPath.endsWith("/")) cdnPath += "/";
        } else if (typeof apiPath === "string") {
            if (!apiPath.endsWith("/")) apiPath += "/";
        } else {
            throw "Invalid initWidget argument!";
        }
        this.useCDN = useCDN;
        this.apiPath = apiPath;
        this.cdnPath = cdnPath;
    }

    async loadModelList() {
        // const response = await fetch(`${this.cdnPath}model_list.json`);
        const response = `{"models":["Potion-Maker/Pio","Potion-Maker/Tia","bilibili-live/22","bilibili-live/33",["ShizukuTalk/shizuku-48","ShizukuTalk/shizuku-pajama"],["HyperdimensionNeptunia/neptune_classic","HyperdimensionNeptunia/nepnep","HyperdimensionNeptunia/neptune_santa","HyperdimensionNeptunia/nepmaid","HyperdimensionNeptunia/nepswim","HyperdimensionNeptunia/noir_classic","HyperdimensionNeptunia/noir","HyperdimensionNeptunia/noir_santa","HyperdimensionNeptunia/noireswim","HyperdimensionNeptunia/blanc_classic","HyperdimensionNeptunia/blanc_normal","HyperdimensionNeptunia/blanc_swimwear","HyperdimensionNeptunia/vert_classic","HyperdimensionNeptunia/vert_normal","HyperdimensionNeptunia/vert_swimwear","HyperdimensionNeptunia/nepgear","HyperdimensionNeptunia/nepgear_extra","HyperdimensionNeptunia/nepgearswim","HyperdimensionNeptunia/histoire","HyperdimensionNeptunia/histoirenohover"],"KantaiCollection/murakumo"],"messages":["来自 Potion Maker 的 Pio 酱 ~","来自 Potion Maker 的 Tia 酱 ~","来自 Bilibili Live 的 22 哦 ~","来自 Bilibili Live 的 33 的说","Shizuku Talk ！这里是 Shizuku ~","Nep! Nep! 超次元游戏：海王星 系列","艦隊これくしょん / 叢雲(むらくも)"]}`;
        this.modelList = await response.json();
    }

    async loadModel(modelId, modelTexturesId, message) {
        localStorage.setItem("modelId", modelId);
        localStorage.setItem("modelTexturesId", modelTexturesId);
        showMessage(message, 4000, 10);
        if (this.useCDN) {
            if (!this.modelList) await this.loadModelList();
            const target = randomSelection(this.modelList.models[modelId]);
            loadlive2d("live2d", `${this.cdnPath}model/${target}/index.json`);
        } else {
            // loadlive2d("live2d", `${this.apiPath}get/?id=${modelId}-${modelTexturesId}`);
            loadlive2d("live2d", `{"version":"1.0.0","model":"../model/Potion-Maker/Pio/model.moc","textures":["../model/Potion-Maker/Pio/textures/school-2017-costume-yellow.png"],"layout":{"center_x":0,"center_y":-0.05,"width":2},"hit_areas_custom":{"head_x":[-0.35,0.6],"head_y":[0.19,-0.2],"body_x":[-0.3,-0.25],"body_y":[0.3,-0.9]},"motions":{"idle":[{"file":"../model/Potion-Maker/Pio/motions/Breath1.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Breath2.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Breath3.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Breath5.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Breath7.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Breath8.mtn"}],"sleepy":[{"file":"../model/Potion-Maker/Pio/motions/Sleeping.mtn"}],"flick_head":[{"file":"../model/Potion-Maker/Pio/motions/Touch Dere1.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Touch Dere2.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Touch Dere3.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Touch Dere4.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Touch Dere5.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Touch Dere6.mtn"}],"tap_body":[{"file":"../model/Potion-Maker/Pio/motions/Sukebei1.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Sukebei2.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Sukebei3.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Touch1.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Touch2.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Touch3.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Touch4.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Touch5.mtn"},{"file":"../model/Potion-Maker/Pio/motions/Touch6.mtn"}]}}`);
            console.log(`Live2D 模型 ${modelId}-${modelTexturesId} 加载完成`);
        }
    }

    async loadRandModel() {
        const modelId = localStorage.getItem("modelId"),
            modelTexturesId = localStorage.getItem("modelTexturesId");
        if (this.useCDN) {
            if (!this.modelList) await this.loadModelList();
            const target = randomSelection(this.modelList.models[modelId]);
            loadlive2d("live2d", `${this.cdnPath}model/${target}/index.json`);
            showMessage("我的新衣服好看嘛？", 4000, 10);
        } else {
            // 可选 "rand"(随机), "switch"(顺序)
            fetch(`${this.apiPath}rand_textures/?id=${modelId}-${modelTexturesId}`)
                .then(response => response.json())
                .then(result => {
                    if (result.textures.id === 1 && (modelTexturesId === 1 || modelTexturesId === 0)) showMessage("我还没有其他衣服呢！", 4000, 10);
                    else this.loadModel(modelId, result.textures.id, "我的新衣服好看嘛？");
                });
        }
    }

    async loadOtherModel() {
        let modelId = localStorage.getItem("modelId");
        if (this.useCDN) {
            if (!this.modelList) await this.loadModelList();
            const index = (++modelId >= this.modelList.models.length) ? 0 : modelId;
            this.loadModel(index, 0, this.modelList.messages[index]);
        } else {
            fetch(`${this.apiPath}switch/?id=${modelId}`)
                .then(response => response.json())
                .then(result => {
                    this.loadModel(result.model.id, 0, result.model.message);
                });
        }
    }
}

export default Model;
