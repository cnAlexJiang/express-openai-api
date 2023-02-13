const express = require('express')
const router = express.Router()
const { Configuration, OpenAIApi } = require('openai')
const lodash = require('lodash')
const configuration = new Configuration({
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)

router.get('/test', async (req, res) => {
  try {
    res.json({
      status: 200,
      message: 'success',
    })
  } catch (error) {
    console.error('catch error' ,error)
    return res.status(500).send('Server error')
  }
})

router.post('/ask', async (req, res) => {
  console.log(req.body.content, typeof req.body, JSON.stringify(req.body))
  try {
    const { content } = req.body
    if (!content) {
      res.send('error')
      res.json({
        status: -1,
        message: 'error',
      })
    } else {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: content + ' \nA',
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['\n'],
      })
      const data = response.data
      const temp = lodash.get(data, 'choices[0].text')
      if (temp) {
        res.json({
          status: 200,
          message: temp,
        })
      } else {
        res.json({
          status: -1,
          message: 'error',
        })
      }
    }
  } catch (error) {
    console.error('catch error' ,error)
    return res.status(500).send('Server error')
  }
})

module.exports = router
