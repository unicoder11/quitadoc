/**
 * SpintaxEngine - Sistema de randomização de texto com variações múltiplas
 * Processa texto spintax: {opção1|opção2|opção3}
 * Exemplo: "{Se você está|Caso esteja} {enfrentando|com} problemas"
 */

export class SpintaxEngine {
  /**
   * Processa texto spintax com randomização pura
   * Cada chamada pode resultar em output diferente
   */
  process(text: string): string {
    const regex = /\{([^{}]+)\}/g;
    
    return text.replace(regex, (match, content) => {
      const options = content.split('|').map((s: string) => s.trim());
      const randomIndex = Math.floor(Math.random() * options.length);
      return options[randomIndex];
    });
  }
  
  /**
   * Versão determinística (mesmo input com mesmo seed = mesmo output)
   * Usa algoritmo linear congruencial para pseudo-randomização
   */
  processWithSeed(text: string, seed: number): string {
    const regex = /\{([^{}]+)\}/g;
    let currentSeed = seed;
    
    return text.replace(regex, (match, content) => {
      const options = content.split('|').map((s: string) => s.trim());
      // Linear congruential generator
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      const index = Math.floor((currentSeed / 233280) * options.length);
      return options[index];
    });
  }
  
  /**
   * Processa múltiplas substituições em uma única passada
   */
  processBatch(texts: string[], seed?: number): string[] {
    return texts.map((text, index) => {
      return seed !== undefined
        ? this.processWithSeed(text, seed + index)
        : this.process(text);
    });
  }
}
