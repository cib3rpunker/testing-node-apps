import * as listItemsDB from './app/db/list-items'
import * as booksDB from './app/db/books'

async function getUserListItems({user}) {
  const listItems = await listItemsDB.readManyBy({ownerId: user.id})
  return expandBookDataMultiple(listItems)
}

async function createListItem({user, bookId}) {
  const existingListItem = await listItemsDB.readBy({ownerId: user.id, bookId})
  if (existingListItem) {
    throw new Error(
      `User ${user.id} already has a list item for the book with the ID ${bookId}`,
    )
  }

  const listItem = await listItemsDB.create({ownerId: user.id, bookId})
  return expandBookData(listItem)
}

async function updateListItem({user, listItemId, updates}) {
  const listItem = await listItemsDB.readById(listItemId)
  if (user.id !== listItem.ownerId) {
    throw new Error(
      `User ${user.id} is not authorized to update the list item with the ID ${listItemId}`,
    )
  }

  const updatedListItem = await listItemsDB.update(listItemId, {
    ...listItem,
    ...updates,
  })
  return expandBookData(updatedListItem)
}

async function deleteListItem({user, listItemId}) {
  const listItem = await listItemsDB.readById(listItemId)
  if (user.id !== listItem.ownerId) {
    throw new Error(
      `User ${user.id} is not authorized to delete the list item with the ID ${listItemId}`,
    )
  }

  await listItemsDB.remove(listItemId)
}

async function expandBookData(listItem) {
  const book = await booksDB.readById(listItem.bookId)
  return {...listItem, book}
}

async function expandBookDataMultiple(listItems) {
  const books = await booksDB.readManyById(listItems.map(li => li.bookId))
  return listItems.map(listItem => ({
    ...listItem,
    book: books.find(book => book.id === listItem.bookId),
  }))
}

export {getUserListItems, createListItem, updateListItem, deleteListItem}
