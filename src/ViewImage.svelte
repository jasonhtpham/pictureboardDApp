<script>
    import {createEventDispatcher} from "svelte";
    export let postsFromSC;

    let comment = "";
    const dispatch = createEventDispatcher();

    const clap = (e) => {
        e.preventDefault();
        dispatch("clap",e.target.alt);
    }
</script>

<p>Images</p>

<ul>
{#each postsFromSC as post}
<li>
    <form on:dblclick={clap}>
        <img src="https://ipfs.infura.io/ipfs/{post.image}" alt={post.image}/>
    </form>
    <p>{post.clapCounts} Like(s) </p>
</li>
{/each}
</ul>