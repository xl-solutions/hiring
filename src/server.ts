import app from './app'

const NODE_PORT = process.env.NODE_PORT

app.listen(NODE_PORT || 3000, () => {
	console.log(`Server listen on port ${NODE_PORT || 3000}`);
});