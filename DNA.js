class DNA{
  
  getRandomCharacter(){
    let c = floor(random(63, 122));
    if(c == 63){
      c = 32;
    }
    if(c == 64){
      c = 46;
    }
    return String.fromCharCode(c);
  }
  
  constructor(DNASize){
    this.DNASize = DNASize;
    this.DNA = [];
    this.fitness = 0;
    
    for(let i = 0; i < this.DNASize; i++){
      this.DNA[i] = this.getRandomCharacter();
    }
  }
  
  calcFitness(target){
    let score = 0;
    for(let i = 0; i < target.length; i++){
      if(target[i] == this.DNA[i]){
        score++;
      }
    }
    this.fitness = score / target.length;
  }
  
  crossover(partner){
    let child = new DNA(this.DNASize);
    let midPoint = floor(random(this.DNASize));
    for(let i = 0; i < this.DNASize; i++){
      if(i > midPoint){
        child.DNA[i] = this.DNA[i];
      }else{
        child.DNA[i] = partner.DNA[i];
      }
    }
    return child;
  }
  
  mutate(mutationRate){
    for(let i = 0; i < this.DNASize; i++){
      if(random(1) < mutationRate){
        this.DNA[i] = this.getRandomCharacter();
      }
    }
  }
}