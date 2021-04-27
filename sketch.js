let populationSize, initialPopulation, bestDNA, targetString, mutationRate;

function charArrayToString(characterArray){
  let val = characterArray.join("");
  return val;
}

function setup() {
  createCanvas(800, 800);
  populationSize = 100;
  mutationRate = 0.01;
  targetString = "Tanmay";
  bestDNA = new DNA(targetString.length);
  population = new Population(populationSize, mutationRate, targetString);
  initialPopulation = population.generateInitialPopulation();
  population.calcFitness(initialPopulation);
}

function draw() {
  background(51);
  fill(255);
  textSize(32);  
  if(population.finished == true){
    console.log('Completed');
    noLoop();
  }
  text('Genetic Algorithm',220, 30);
  text('Target String: ' + targetString, 10, 70);
  text('Current String: ' + charArrayToString(bestDNA.DNA), 10, 110);
  text('Generation: ' + population.generation, 10, 150);
  text('Mutation Rate: ' + mutationRate, 10, 190);
  text('PopulationSize: ' + populationSize, 10, 230);
  text('Mating Pool Size: ' + population.matingPool.length, 10, 270);
  population.selectParent(initialPopulation);
  initialPopulation = population.generate(initialPopulation);
  population.calcFitness(initialPopulation);
  bestDNA = population.evaluate(initialPopulation);
}