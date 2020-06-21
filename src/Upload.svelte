<script>
    import { createEventDispatcher } from "svelte";

    const IPFS = require('ipfs');
    const dispatch = createEventDispatcher();

    let fileToUpload;
    let filePreview;

    const uploadFileIPFS = async (file) => {
        const ipfs = await IPFS.create();
        for await (const result of ipfs.add(file)) {
            dispatch("upload", result);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        uploadFileIPFS(fileToUpload);
    }

    const fileChange = async (e) => {
        fileToUpload = e.srcElement.files[0];
        filePreview = await readFile(fileToUpload);
    }

    function readFile (file) {
        const reader = new FileReader()
        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort()
                reject(`problem reading file ${file.name}`)
            }
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.readAsDataURL(file)
    })
    }
	
</script>

<h2 class="subtitle">Upload your Images to Picture Board</h2>
<div class="preview">
    <img src={filePreview} alt="filepreview" />
</div>

<div class="upload-form" id="upload-form">
    <form on:submit={onSubmit}>
        <input type="file" on:change={fileChange} />
        <input type="submit">
    </form>
</div>

<div class="view-image-button">
    <input type="submit" on:click={() => dispatch("viewImage")} value="View Picture Board" />
</div>