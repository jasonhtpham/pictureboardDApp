<script>
import ipfs from "./ipfs";

let filepreview;

const onSubmit = (e) => {
	e.preventDefault();
	console.log("Submitted");
	ipfs.add(filepreview, (err, hash) => {
		if (err) {
			return console.log(err);
		}
		console.log("https://ipfs.infura.io/ipfs/" + hash);
	})
}

const fileChange = async (e) => {
	e.preventDefault();
	const file = e.srcElement.files[0];
	filepreview = await readFile(file);
	console.log(filepreview);
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

<style>
	h1 {
		color: rgb(59, 70, 168);
	}
</style>

<h1>Picture board DApp by Jason</h1>

<img src={filepreview} alt="filepreview" />

<form on:submit={onSubmit}>
<input type="file" on:change={fileChange} />
<input type="submit">
</form>