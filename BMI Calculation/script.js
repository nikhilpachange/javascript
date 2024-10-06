document.getElementById('calculateBtn').addEventListener('click', calculateBMI);
document.getElementById('resetBtn').addEventListener('click', resetForm);

function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = document.getElementById('activity').value;

    if (!height || !weight || !age) {
        alert('Please enter valid height, weight, and age');
        return;
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    document.getElementById('bmi-value').innerText = bmi;

    const { category, bodyFat, calories, risks, exercise, nutrition } = getBMIRecommendations(bmi, gender, age, activity);

    document.getElementById('bmi-category').innerText = `Category: ${category}`;
    document.getElementById('body-fat-percentage').innerText = `Estimated Body Fat: ${bodyFat}%`;
    document.getElementById('calories-needed').innerText = `Calories Needed Per Day: ${calories} kcal`;
    document.getElementById('health-risks').innerText = `Health Risks: ${risks}`;
    document.getElementById('exercise-recommendation').innerText = `Recommended Exercise: ${exercise}`;
    document.getElementById('nutrition-advice').innerText = `Nutrition Advice: ${nutrition}`;

    document.getElementById('result-section').style.display = 'block';
}

function getBMIRecommendations(bmi, gender, age, activity) {
    let category, bodyFat, calories, risks, exercise, nutrition;

    if (bmi < 18.5) {
        category = 'Underweight';
        bodyFat = gender === 'male' ? '10-12' : '18-20';
        calories = calculateCalories(activity, weight, 'gain');
        risks = 'Risk of nutrient deficiencies, fatigue, and weakened immune system.';
        exercise = 'Focus on strength training to build muscle mass.';
        nutrition = 'Eat more calorie-dense foods with a balance of proteins, carbs, and healthy fats.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal';
        bodyFat = gender === 'male' ? '13-18' : '21-25';
        calories = calculateCalories(activity, weight, 'maintain');
        risks = 'Low risk of health problems associated with weight.';
        exercise = 'Maintain a balanced routine of cardio and strength training.';
        nutrition = 'Continue a balanced diet with adequate nutrition.';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
        bodyFat = gender === 'male' ? '19-24' : '26-31';
        calories = calculateCalories(activity, weight, 'lose');
        risks = 'Higher risk of cardiovascular disease, diabetes, and hypertension.';
        exercise = 'Focus on cardio exercises like jogging, cycling, or swimming.';
        nutrition = 'Reduce intake of processed foods, refined sugars, and high-fat meals.';
    } else {
        category = 'Obese';
        bodyFat = gender === 'male' ? '25+' : '32+';
        calories = calculateCalories(activity, weight, 'lose');
        risks = 'Significantly higher risk of chronic conditions like heart disease, diabetes, and certain cancers.';
        exercise = 'Incorporate low-impact cardio and strength training gradually.';
        nutrition = 'Adopt a low-calorie, nutrient-dense diet under the guidance of a nutritionist.';
    }

    return { category, bodyFat, calories, risks, exercise, nutrition };
}

function calculateCalories(activity, weight, goal) {
    let baseCalories;
    switch (activity) {
        case 'sedentary':
            baseCalories = weight * 22;
            break;
        case 'light':
            baseCalories = weight * 25;
            break;
        case 'moderate':
            baseCalories = weight * 28;
            break;
        case 'active':
            baseCalories = weight * 32;
            break;
    }
    if (goal === 'lose') {
        return (baseCalories - 500).toFixed(0);
    } else if (goal === 'gain') {
        return (baseCalories + 500).toFixed(0);
    }
    return baseCalories.toFixed(0);
}

function resetForm() {
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('age').value = '';
    document.getElementById('bmi-value').innerText = '0';
    document.getElementById('bmi-category').innerText = '';
    document.getElementById('body-fat-percentage').innerText = '';
    document.getElementById('calories-needed').innerText = '';
    document.getElementById('health-risks').innerText = '';
    document.getElementById('exercise-recommendation').innerText = '';
    document.getElementById('nutrition-advice').innerText = '';
    document.getElementById('result-section').style.display = 'none';
}
