<script>
    import {createEventDispatcher} from "svelte";
    export let postsFromSC;

    const dispatch = createEventDispatcher();

    const clap = (e) => {
        e.preventDefault();
        dispatch("clap",e.target.alt);
    }

    const commentOnPost = (e) => {
        e.preventDefault();
        dispatch("comment", e.target);
    }
</script>

<h2 class="subtitle">Picture Board</h2>

    <p>Double-click on image to give it a like. <br/>
    And, feel free to drop your comments and submit them.</p>

<input type="submit" value="Back" on:click={() => dispatch("back")}/>

{#each postsFromSC as post}
    <div class="post-box">
        <form on:dblclick={clap} on:submit={commentOnPost} name={post.image}>
            <img src="https://ipfs.infura.io/ipfs/{post.image}" alt={post.image}/>
            <input type="text" placeholder="Comment your thoughts about this image" maxlength="32"/> <input type="submit">
        </form>
        <p>{post.clapCounts} Like(s) </p>
        
        <div class="comment-display">
            <p><b>Comments ({post.comment.length})</b></p>
            {#each post.comment as comment}
                <p>{comment} <br /> </p>
            {/each}
        </div>
    </div>
{/each}