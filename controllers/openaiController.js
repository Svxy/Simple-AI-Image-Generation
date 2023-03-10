const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


const generateImage = async (req, res) => {
    const { prompt, size } = req.body;

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try{
        const response = await openai.createImage({
            prompt,     //what kind of image you want to create
            n: 1,   //number of images created
            size: imageSize
        });

        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl
        })
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }

        res.status(400).json({
            success: false,
            error: 'Sorry. The image could not be generated.'
        })
    }
}

module.exports = { generateImage };