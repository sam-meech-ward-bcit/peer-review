
const formRows = $("#form_rows")
const addRowButton = $("#add_row")
const form = $('form')

let totalTeamMates = 0
const criteria = ["Quality", "Responsibility", "Communication", "Contribution", "Attitude"]

function newInput(criterion) {
  return `
  <div class="input-field col s2">
    <input id="${criterion}_input_${totalTeamMates}" type="number">
    <label for="${criterion}_input_${totalTeamMates}">${criterion}</label>
  </div>
  `
}

function newRow() {
  totalTeamMates++
  return `<div class="row">
  <div class="input-field col s2">
    <input id="student_id_${totalTeamMates}" type="text">
    <label for="student_id_${totalTeamMates}">Student ID</label>
  </div>
  ${criteria.map(newInput).join('')}
  </div>
  `
}



addRowButton.on('click', event => {
  formRows.append($(newRow()))
})

function getStudentValues() {
  let inputs = {}
  console.log(totalTeamMates)
  for (let i = 1; i <= totalTeamMates; i++) {
    const values = {}
    let total = 0
    for (const criterion of criteria) {
      const value = Number($(`#${criterion}_input_${i}`).val())
      total += value
      values[criterion] = value
    }
    values.total = total
    inputs[$(`#student_id_${i}`).val().trim()] = values
  }
  return inputs
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

form.on('submit', event => {
  event.preventDefault()

  const name = $("#your_name").val().trim()
  const id = $("#student_id").val().trim()
  const team = $("#team_name").val().trim()

  const userDetails = {
    name,
    id,
    team,
    teamMates: getStudentValues()
  }

  console.log(userDetails)

  // Start file download.
  download("peerReview.json", JSON.stringify(userDetails, null, 2))
})