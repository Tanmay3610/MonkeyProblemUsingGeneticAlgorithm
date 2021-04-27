class Population{
  
  constructor(populationSize, mutationRate, targetString){
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.target = targetString;
    this.finished = false;
    this.matingPool = [];
    this.generation = 0;
  }
  
  generateInitialPopulation(){
    let initialPopulation = []
    for(let i = 0; i < this.populationSize; i++){
      initialPopulation[i] = new DNA(this.target.length);
    }
    return initialPopulation;
  }
  
  calcFitness(initialPopulation){
    for(let i = 0; i < this.populationSize; i++){
      initialPopulation[i].calcFitness(this.target);
    }
  }
  
  selectParent(initialPopulation){
    let maximumFitness = 0;
    for(let i = 0; i < this.populationSize; i++){
      if(maximumFitness < initialPopulation[i].fitness){
        maximumFitness = initialPopulation[i].fitness;
      }
    }
    
    for(let i = 0; i < this.populationSize; i++){
      let fitness = map(initialPopulation[i].fitness, 0, maximumFitness, 0, 1);
      let n = floor(fitness * 100);
      for(let j = 0; j < n; j++){
        this.matingPool.push(initialPopulation[i]);
      }
    }
  }
  
  generate(initialPopulation){
    for(let i = 0; i < this.populationSize; i++){
      let a = floor(random(this.matingPool.length))
      let parentA = this.matingPool[a];
      
      let parentB = this.matingPool[floor(random(this.matingPool.length))];
      let child = parentA.crossover(parentB);
      child.mutate(this.mutationRate);
      initialPopulation[i] = child;
    }
    this.generation++;
    return initialPopulation;
  }
  
  evaluate(initialPopulation){
    let maximumFitness = 0, bestDNA = new DNA(this.target.length);
    for(let i = 0; i < this.populationSize; i++){
      if(maximumFitness < initialPopulation[i].fitness){
        maximumFitness = initialPopulation[i].fitness;
        bestDNA = initialPopulation[i];
      }
    }
    if(maximumFitness == 1){
      this.finished = true;
    }
    return bestDNA;
  }
}