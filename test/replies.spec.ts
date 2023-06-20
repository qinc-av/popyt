import 'mocha'
import { expect } from 'chai'
import { YTComment } from '../src'
import { youtube } from './setup-instance'
import { Cache } from '../src/util'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Replies', () => {
  it('should work with valid comments with replies', async () => {
    console.log(Cache['cache'])
    const replies = await youtube.getCommentReplies('Ugyv3oMTx4CLRXS-9BZ4AaABAg')
    expect(replies[0]).to.be.instanceOf(YTComment)

    return {}
  })

  it('should return an empty array with invalid comments/comments with no replies', async () => {
    expect((await youtube.getCommentReplies('0')).length).to.equal(0)
  })

  it('should return an array with a length of <= maxPerPage', async () => {
    expect((await youtube.getCommentReplies('Ugyv3oMTx4CLRXS-9BZ4AaABAg', { maxPerPage: 1 })).length).to.be.lessThan(2)
  })

  it('should have the ID of the comment it replied to', async () => {
    const comment = await youtube.getComment('Ugyv3oMTx4CLRXS-9BZ4AaABAg')
    const replies = await comment.fetchReplies({ maxPerPage: 1 })

    expect(replies[0].parentCommentId).to.equal('Ugyv3oMTx4CLRXS-9BZ4AaABAg')
  })
})
