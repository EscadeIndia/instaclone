const userStoryModel = require('../../models/story/userStorySchema');

const storyResponse = async (data) => {
	try{
		//console.log("dataBefore",data)
		// const test = async (request,response , data) =>{
		// 	console.log("data",data)
		// 	const deleteStory = await userStoryModel.deleteOne(data);
		// 	console.log("del",deleteStory)
		// }	
		// function test (data){
		// 	const deleteStory = await userStoryModel.deleteOne(data);
		// }

		//setTimeout(test, 10000 ,data);

       	// Save User in the database
	const userStoryResult = new userStoryModel(data);
	const result = await userStoryResult.save(userStoryResult);
	return result;
	}catch(err){
		return "error"
	}
}

const deleteStoryResponse = async (data)=> {
	try{
		console.log("data", data);
        const deleteStory = await userStoryModel.deleteOne(data);
        console.log("deleteStory", deleteStory);
	}catch(err){
		return err;
	}
	
}

module.exports = {	storyResponse , deleteStoryResponse,   };