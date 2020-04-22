<script>
    import { createEventDispatcher } from "svelte";

    const IPFS = require('ipfs');
    const dispatch = createEventDispatcher();

    let fileToUpload;
    let filePreview;

    const uploadFile = async (file) => {
        const ipfs = await IPFS.create();

        for await (const result of ipfs.add(file)) {
            dispatch("upload", result);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        uploadFile(fileToUpload);
        dispatch("caption", e.target.elements[1].value)
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

<img src={filePreview} alt="filepreview" />

<form on:submit={onSubmit}>
<input type="file" on:change={fileChange} />
<input type="text" placeholder="Caption" />
<input type="submit">
</form>