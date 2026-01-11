# Design System Web Multimarcas

Repositório que implementa um Design System baseado em Web Components (Lit) e organizado para suportar múltiplas marcas e temas.

## Instalação e execução

1. Clone o repositório:

```bash
git clone git@github.com:guivezula/design-system-web-multibrand.git
cd design-system-web-multibrand
```
2. Instale o Node.js (versão recomendada: 20.x ou superior). Caso tenha o nvm instalado, pode usar:

```bash
nvm install 20
nvm use 20
```

3. Instale dependências:

```bash
npm install
```

4. Execute os scripts disponíveis:
```bash
npm run storybook    # rodar Storybook (docs/preview)
npm run test         # rodar testes
```

## Tecnologias usadas

- Web Components (Lit)
- Storybook (docs e exemplos)
- TypeScript
- Vitest e Open WC Testing (testes unitários)
- Sass / CSS modules para estilos
- Style Dictionary (tokens de design)

## Se você tivesse mais tempo, o que evoluiria nesse Design System e por quê?

- Documentação de melhores práticas e descrição de componentes base: fornecer guidelines claras para criação de novos componentes e manutenção do design system.
- Implementação do build: configurar o build para gerar o pacote final e do storybook hospedável.
- Criar um monorepo para separar a implementação do design system dos tokens e temas.
- Adicionar a biblioteca de assets (ícones, imagens).
- Adicionar teste de cobertura (coverage) e melhorar a cobertura dos testes unitários.
- Integração com frameworks: exemplos e adaptadores prontos (React/Vue/Angular) para simplificar a adoção pelos consumidores.
