let population, initialPopulation;
function setup() {
  let populationSize = 1000;
  let mutationRate = 0.01;
  let targetString = "Tanmay";
  
  population = new Population(populationSize, mutationRate, targetString);
  initialPopulation = population.generateInitialPopulation();
  population.calcFitness(initialPopulation);
}

function draw() {
  if(population.finished == true){
    console.log(population.generation);
    console.log('Completed');
    noLoop();
  }
  population.selectParent(initialPopulation);
  initialPopulation = population.generate(initialPopulation);
  population.calcFitness(initialPopulation);
  let bestDNA = population.evaluate(initialPopulation);
  console.log(bestDNA.DNA);
}