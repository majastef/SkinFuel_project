// Evade duplication of elements when creating database
async function noDuplicates(list, databaseList, model) {
  for (let listElement of list) {
    const existing = databaseList.find(el => el.name === listElement.name)

    if (!existing) {
      await model.create(listElement)
    }
  }
}

// Remove element from database when removed in a model
async function removed(list, databaseList, model) {
  const removed = databaseList.filter(el => !list.some(listElement => listElement.name === el.name))
  
  if (removed) {
    for (let el of removed) {
      await model.deleteOne({ name: el.name })
    }
  }
}

module.exports = {
  noDuplicates,
  removed
}