// 🧠 Artifact Assistant Logic (lightweight, JS only)

export default class ArtifactAssistant {
  constructor(artifactsData) {
    this.artifacts = artifactsData;
    this.context = [];
  }

  // Save chat context
  remember(userText) {
    this.context.push(userText.toLowerCase());
    if (this.context.length > 8) this.context.shift(); // memory limit
  }

  // Analyze intent from text
  detectIntent(text) {
    text = text.toLowerCase();

    if (text.includes("hello") || text.includes("hi")) return "greet";
    if (text.includes("summary") || text.includes("stats")) return "summary";
    if (text.includes("underperforming") || text.includes("low")) return "low";
    if (text.includes("best") || text.includes("top")) return "top";
    if (text.includes("add") || text.includes("new")) return "add";
    if (text.includes("refresh")) return "refresh";
    if (text.includes("british")) return "british";
    if (text.includes("maurya")) return "maurya";
    if (text.includes("civilization")) return "civilization";
    return "unknown";
  }

  // Generate response
  generateResponse(text) {
    this.remember(text);
    const intent = this.detectIntent(text);

    switch (intent) {
      case "greet":
        return this.reply("👋 Hey Admin! I’m your Artifact Assistant. What can I analyze for you today?");
      case "summary":
        return this.showSummary();
      case "low":
        return this.showLowPerformers();
      case "top":
        return this.showTopArtifacts();
      case "add":
        return this.reply("🛠️ You can add a new artifact using the form above each section.");
      case "refresh":
        return this.reply("🔄 Refreshing all artifact data... Done!");
      case "british":
        return this.showByType("British");
      case "maurya":
        return this.showByType("Maurya");
      case "civilization":
        return this.showByType("Civilization");
      default:
        return this.smartFallback(text);
    }
  }

  // Simulated typing delay
  reply(message) {
    return new Promise(resolve => {
      setTimeout(() => resolve(message), 600 + Math.random() * 500);
    });
  }

  // 🧩 Intent-based methods
  async showSummary() {
    const groups = this.groupArtifacts();
    const summary = Object.entries(groups)
      .map(([type, list]) => `📚 ${type}: ${list.length}`)
      .join("\n");
    return await this.reply(`📊 Artifact Summary:\n${summary}`);
  }

  async showLowPerformers() {
    const low = this.artifacts.filter(a => a.Engagement && a.Engagement < 5);
    if (low.length === 0)
      return await this.reply("🎯 All artifacts have healthy engagement!");
    const list = low.map(a => `⚠️ ${a.Name || a["Artifact Name"]} (${a.Engagement})`).join("\n");
    return await this.reply(`Low engagement artifacts:\n${list}`);
  }

  async showTopArtifacts() {
    const top = [...this.artifacts]
      .sort((a, b) => (b.Engagement || 0) - (a.Engagement || 0))
      .slice(0, 3);
    const list = top.map(a => `🏆 ${a.Name || a["Artifact Name"]} (${a.Engagement})`).join("\n");
    return await this.reply(`Top 3 performing artifacts:\n${list}`);
  }

  async showByType(type) {
    const list = this.artifacts.filter(a => a.Civilization === type);
    if (!list.length)
      return await this.reply(`No ${type} artifacts found.`);
    const avgEng = (
      list.reduce((sum, a) => sum + (a.Engagement || 0), 0) / list.length
    ).toFixed(2);
    return await this.reply(`📜 ${type} Collection:\nTotal: ${list.length}\nAvg Engagement: ${avgEng}`);
  }

  // Group by civilization
  groupArtifacts() {
    return this.artifacts.reduce((acc, a) => {
      const civ = a.Civilization || "Unknown";
      if (!acc[civ]) acc[civ] = [];
      acc[civ].push(a);
      return acc;
    }, {});
  }

  // Smart fallback for unknown inputs
  async smartFallback(text) {
    const last = this.context[this.context.length - 2] || "";
    if (last.includes("summary") && text.includes("details")) {
      return await this.reply("You can type ‘show British artifacts’ or ‘show top performers’ for detailed breakdowns.");
    }
    return await this.reply("🤖 I didn’t quite catch that. Try asking about ‘summary’, ‘top performers’, or ‘low engagement’.");
  }
}
