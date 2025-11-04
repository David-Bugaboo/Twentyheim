/**
 * Função para converter strings em slugs (URL-friendly)
 * @param {string} text - Texto para converter
 * @param {object} options - Opções de configuração
 * @returns {string} - Texto convertido em slug
 */
function slugify(text, options = {}) {
  const defaultOptions = {
    lower: true,
    strict: false,
    locale: "pt",
    trim: true,
  };

  const opts = { ...defaultOptions, ...options };

  if (!text) return "";

  let slug = text.toString();

  // Converte para minúsculo se solicitado
  if (opts.lower) {
    slug = slug.toLowerCase();
  }

  // Remove acentos
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Substitui caracteres especiais
  if (opts.strict) {
    // Modo estrito: apenas letras, números e hífens
    slug = slug.replace(/[^a-z0-9]/g, "-");
  } else {
    // Modo normal: mantém alguns caracteres especiais úteis
    slug = slug
      .replace(/[àáâãäå]/g, "a")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/[òóôõö]/g, "o")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ç]/g, "")
      .replace(/[ñ]/g, "n")
      .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .replace(/-+/g, "-"); // Remove hífens duplicados
  }

  // Remove hífens do início e fim
  if (opts.trim) {
    slug = slug.replace(/^-+|-+$/g, "");
  }

  return slug;
}

// Exporta a função para uso em outros arquivos
if (typeof module !== "undefined" && module.exports) {
  module.exports = slugify;
}
