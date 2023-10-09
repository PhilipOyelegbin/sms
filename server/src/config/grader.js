// Define a function to calculate the total marks and return a promise
const calculateTotalMarks = (marks) =>{
  return new Promise((resolve,reject)=>{
    const {math, english, biology, government} = marks

    if(!(math, english, biology, government)) {
      reject("Null values for marks")
    } else {
      totalMarks = (math + english + biology + government)
      resolve(totalMarks)
    }
  })
}

// Define a function to calculate average marks and return a promise
const calculateAverageMarks = (totalMarks, marksLength) =>{
  return new Promise((resolve,reject)=>{
      if(!totalMarks) {
          reject(null)
      } else {
          average = (totalMarks / marksLength)
          resolve(average)
      }
  })
}

// Define a function to calculate grade and return a promise
const calculateGrade = (averageMarks)=>{
  return new Promise((resolve,reject)=>{
      if(isNaN(averageMarks) || averageMarks < 0 || averageMarks > 100) {
          reject(new Error('Invalid average mark. Please provide a valid value between 0 and 100.'));
      } else if(averageMarks >= 90) {
          resolve('A+');
      } else if(averageMarks >= 80) {
          resolve('A');
      } else if(averageMarks >= 70) {
          resolve('B');
      } else if(averageMarks >= 60) {
          resolve('C');
      } else if(averageMarks >= 50) {
        resolve('D');
      } else if(averageMarks >= 40) {
          resolve('E');
      } else {
          resolve('F');
      }
  })
}

module.exports = {
  calculateTotalMarks,
  calculateAverageMarks,
  calculateGrade
}
