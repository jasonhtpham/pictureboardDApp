<script>
    // import {createEventDispatcher} from "svelte";
    export let imagesFromSC;
    let comment = "";

    const commentToImage = (e) => {
        e.preventDefault();
        // console.log(imageHash);
        console.log(e);
    }
</script>

<p>Images</p>

<ul>
{#each imagesFromSC as image}
<li>
    <form on:submit={commentToImage}>
        <img src="https://ipfs.infura.io/ipfs/{image}" alt="image link"/>
        <input type="text" placeholder="Comment" /> <input type="submit" value="Send"/>
    </form>
</li>
{/each}
</ul>