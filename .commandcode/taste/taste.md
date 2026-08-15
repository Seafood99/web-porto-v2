# Taste

## Communication

- Communicates in Indonesian (Bahasa Indonesia), casual/informal register (e.g., "chat, bisa bantu aku...", "ini lhoo", "masa gabisa liat?"). Respond in kind. Confidence: 0.9

## Tooling

- Uses the PecutOpus gateway (api.pecutopus.web.id) with opencode; keeps the provider's models registered in the opencode config (opencode.jsonc) so they can be selected. When given a list of models, wants ALL of them added to the config, not just a subset — everything should be selectable via the model switcher. Confidence: 0.9
- Preferred model lineup for opencode: Claude Opus 5 as the main/default model (with DeepSeek V4 Pro and Qwen 3.8 Max among the favorites) and a cheap/fast model (e.g., DeepSeek V4 Flash, 1x usage) as the small model for light tasks. Confidence: 0.8
