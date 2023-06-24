---
id: "Library_Exports.Comment"
title: "Documentation"
sidebar_label: "Comment"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).Comment

## Constructors

### constructor

• **new Comment**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `any` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/comment.ts:138](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L138)

## Properties

### author

• **author**: `Object`

The comment's author.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `avatar` | `string` | The author's avatar URL. |
| `channelId` | `string` | The author's channel ID. |
| `channelUrl` | `string` | The author's channel URL. |
| `username` | `string` | The author's YouTube username. May not be unique. |

#### Defined in

[entities/comment.ts:44](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L44)

___

### channelId

• `Optional` **channelId**: `string`

The ID of the channel that uploaded the video this comment is on, if any.

#### Defined in

[entities/comment.ts:114](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L114)

___

### data

• **data**: `any`

The raw data from the YouTube API of the comment.

#### Defined in

[entities/comment.ts:29](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L29)

___

### dateEdited

• **dateEdited**: `Date`

Either the date the comment was last edited, or the date it was
posted.

#### Defined in

[entities/comment.ts:109](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L109)

___

### datePublished

• **datePublished**: `Date`

The date the comment was published.

#### Defined in

[entities/comment.ts:103](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L103)

___

### full

• **full**: `boolean` = `true`

Whether or not this a full comment object.

#### Defined in

[entities/comment.ts:39](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L39)

___

### id

• **id**: `string`

The comment's unique YouTube ID.

#### Defined in

[entities/comment.ts:34](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L34)

___

### likes

• **likes**: `number`

The number of likes the comment has received.

#### Defined in

[entities/comment.ts:93](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L93)

___

### parentCommentId

• `Optional` **parentCommentId**: `string`

If this comment is a reply, then this is the ID of the comment it is replying to.

#### Defined in

[entities/comment.ts:124](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L124)

___

### popular

• **popular**: `boolean`

Either YouTube thinks it's popular, or it has at least 100 likes.

#### Defined in

[entities/comment.ts:88](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L88)

___

### rateable

• **rateable**: `boolean`

Whether or not you can like/dislike the comment.

#### Defined in

[entities/comment.ts:83](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L83)

___

### replies

• **replies**: [`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Comment`](Library_Exports.Comment)\>

Replies directed to the comment. If the comment was fetched from a video,
then this will be partially filled. You'll need to use [Comment.fetchReplies](./Library_Exports.Comment#fetchReplies)
to get all of the replies, though.

#### Defined in

[entities/comment.ts:131](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L131)

___

### replyCount

• `Optional` **replyCount**: `number`

If this comment was fetched from a video, then this is the number of replies on it.

#### Defined in

[entities/comment.ts:136](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L136)

___

### text

• **text**: `Object`

The comment's content.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `displayed` | `string` | What YouTube displays to the user viewing the comment. |
| `original` | `string` | The comment's plain text. |

#### Defined in

[entities/comment.ts:69](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L69)

___

### url

• `Optional` **url**: `string`

The url of the comment.

#### Defined in

[entities/comment.ts:98](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L98)

___

### videoId

• `Optional` **videoId**: `string`

The ID of the video that this comment is on, if any.

#### Defined in

[entities/comment.ts:119](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L119)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object used to create the comment.

#### Defined in

[entities/comment.ts:24](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L24)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'comments'`

The name of the endpoint used for this entity.

#### Defined in

[entities/comment.ts:8](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L8)

___

### fields

▪ `Static` **fields**: `string`

The fields to request for this entity.

#### Defined in

[entities/comment.ts:18](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L18)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/comment.ts:13](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L13)

## Methods

### delete

▸ **delete**(): `Promise`<`void`\>

Deletes the comment.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/comment.ts:256](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L256)

___

### edit

▸ **edit**(`text`): `Promise`<[`Comment`](Library_Exports.Comment)\>

Edits the comment.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The new text of the comment. |

#### Returns

`Promise`<[`Comment`](Library_Exports.Comment)\>

#### Defined in

[entities/comment.ts:216](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L216)

___

### fetchReplies

▸ **fetchReplies**(`pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Comment`](Library_Exports.Comment)\>\>

Fetches replies to the comment from the API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`CommentParts`](../modules/Library_Exports#commentparts) | The parts of the object to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Comment`](Library_Exports.Comment)\>\>

#### Defined in

[entities/comment.ts:205](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L205)

___

### markAsSpam

▸ **markAsSpam**(): `Promise`<`void`\>

Marks the comment as spam.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/comment.ts:235](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L235)

___

### reply

▸ **reply**(`text`): `Promise`<[`Comment`](Library_Exports.Comment)\>

Replies to the comment.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text of the reply. |

#### Returns

`Promise`<[`Comment`](Library_Exports.Comment)\>

#### Defined in

[entities/comment.ts:226](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L226)

___

### setModerationStatus

▸ **setModerationStatus**(`status?`, `banAuthor?`): `Promise`<`void`\>

Sets the comment's moderation status.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `status?` | ``"rejected"`` \| ``"heldForReview"`` \| ``"published"`` | `undefined` | The status to set the comment to. |
| `banAuthor` | `boolean` | `false` | Whether or not to ban the author of the comment from commenting again. Defaults to false. |

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/comment.ts:247](https://github.com/brandonbothell/popyt/blob/b4e3354/src/entities/comment.ts#L247)