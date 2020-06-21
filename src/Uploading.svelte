<style>
    h1 {
        text-emphasis: 10;
    }

    .loader-container{
        text-align: center;
    }

    .loader {
    display: inline-block;
    border-bottom: 16px solid #31b3ca; 
    border-top: 16px solid white; /*#2673b8*/
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    }

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }

</style>

<div class="loader-container">
    <div class="loader"></div>
    <h1>Please wait...</h1>
</div>