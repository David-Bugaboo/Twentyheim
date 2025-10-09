# Page Components

Componentes genéricos reutilizáveis para páginas do Wyrdgrave.

## Componentes Disponíveis

### Layout Components

#### `PageContainer`

Container principal da página com fundo escuro e altura mínima de 100vh.

```tsx
<PageContainer>{/* conteúdo da página */}</PageContainer>
```

#### `HeroSection`

Seção hero com imagem de fundo e overlay escuro.

**Props:**

- `backgroundImage?: string` - URL da imagem de fundo

```tsx
<HeroSection backgroundImage={heroImage}>
  <HeroContent>
    <PageTitle>Título da Página</PageTitle>
  </HeroContent>
</HeroSection>
```

#### `HeroContent`

Container centralizado para conteúdo dentro do HeroSection.

#### `ContentSection`

Seção de conteúdo com efeitos de pergaminho envelhecido.

```tsx
<ContentSection>
  <ContentContainer>{/* conteúdo */}</ContentContainer>
</ContentSection>
```

#### `ContentContainer`

Container com largura máxima de 900px e gap entre elementos filhos.

#### `NavigationSection`

Seção para botões de navegação com fundo gradiente.

```tsx
<NavigationSection>
  <Box sx={{ maxWidth: "600px", width: "100%" }}>{/* botões */}</Box>
</NavigationSection>
```

### Typography Components

#### `PageTitle`

Título principal da página estilizado com fonte Cinzel.

**Variantes:** h1, h2, h3, etc.

```tsx
<PageTitle variant="h1">Título</PageTitle>
```

#### `ParchmentText`

Texto com aparência de pergaminho antigo, incluindo bordas decorativas e textura.

```tsx
<ParchmentText>Seu texto aqui...</ParchmentText>
```

#### `QuoteBox`

Caixa para citações com estilo itálico e bordas.

```tsx
<QuoteBox>
  "Citação aqui"
  <QuoteAttribution>— Autor</QuoteAttribution>
</QuoteBox>
```

#### `QuoteAttribution`

Atribuição de citação (autor) dentro do QuoteBox.

### Interactive Components

#### `StyledNavigationButton`

Botão estilizado para navegação com efeito de brilho ao hover.

**Props:** Todas as props do MUI Button

```tsx
<StyledNavigationButton
  onClick={() => navigate("/path")}
  variant="outlined"
  fullWidth
>
  Label do Botão
</StyledNavigationButton>
```

## Exemplo de Uso Completo

```tsx
import {
  PageContainer,
  HeroSection,
  HeroContent,
  PageTitle,
  ContentSection,
  ContentContainer,
  ParchmentText,
  NavigationSection,
  StyledNavigationButton,
  QuoteBox,
  QuoteAttribution,
} from "../components/PageComponents";
import heroImage from "../assets/images/hero.png";

function MyPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <HeroSection backgroundImage={heroImage}>
        <HeroContent>
          <PageTitle variant="h1">Título da Página</PageTitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <ContentContainer>
          <ParchmentText>Seu conteúdo aqui...</ParchmentText>

          <QuoteBox>
            "Uma citação memorável"
            <QuoteAttribution>— Autor Desconhecido</QuoteAttribution>
          </QuoteBox>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <StyledNavigationButton
            onClick={() => navigate("/path")}
            variant="outlined"
            fullWidth
          >
            Botão de Navegação
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}
```

## Estilos

Todos os componentes seguem o tema dark fantasy com:

- Paleta de cores: preto profundo, cinzas e dourado (#d4af37)
- Fontes: Cinzel (títulos) e Crimson Text (corpo)
- Efeitos de pergaminho envelhecido
- Bordas e sombras sutis
- Transições suaves
