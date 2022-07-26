const cardFactory = (title, project, priority, dueDate, notes, checked) => {
    return { title, project, priority, dueDate, notes, checked, properties: ["title", "project", "priority", "dueDate", "notes", "checked"] }
}
export { cardFactory }