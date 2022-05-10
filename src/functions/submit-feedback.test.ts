// test('sum 2 + 2', () => {
//   expect(2 + 2).toBe(4)
// })

import { SubmitFeedback } from "./submit-feedback"

describe('Submit feedback' , () => {
  it('should be able to submit a feedback', async() => {
    const submitFeedback = new SubmitFeedback({create: async() => {}}, {sendMail: async() => {}})

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This is a bug',
      screenshot: 'data:image/png;base64,81293adjsahdjaisd'
    })).resolves.not.toThrow();
  })
})