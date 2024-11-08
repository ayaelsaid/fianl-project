function openForm(animalName, postId) {
    document.getElementById("animalName").innerText = animalName;
   document.getElementById("postId").value = postId
    document.getElementById("formOverlay").style.display = "flex";
}




dayjs.extend(dayjs_plugin_relativeTime);
dayjs.extend(dayjs_plugin_isToday);
dayjs.extend(dayjs_plugin_isYesterday);

document.addEventListener('DOMContentLoaded', function () {
document.querySelectorAll('.post-date').forEach(function (dateElement) {
    const date = dayjs(dateElement.dataset.date);
    
    function getDate(date, dateText) { 
        if (date.isToday()) {
            let time = date.format('HH:mm');
            dateText.textContent = `Today at ${time}`;
        } else if (date.isYesterday()) {
            let time = date.format('HH:mm');
            dateText.textContent = `Yesterday at ${time}`;
        } else if (dayjs().diff(date, 'day') < 7) { 
            let day = date.format('dddd HH:mm');
            dateText.textContent = `${day}`;
        } else if (dayjs().diff(date, 'day') < 30) { 
            let month = date.format('MMMM Do');
            dateText.textContent = `${month}`;
        } else {
            let formattedDate = date.format('MMMM Do, YYYY');
            dateText.textContent = `${formattedDate}`;
        }
        console.log(`Updated text: ${dateText.textContent}`);
    }

    getDate(date, dateElement);
});
});



function closeForm() {
    document.getElementById("formOverlay").style.display = "none";
}
