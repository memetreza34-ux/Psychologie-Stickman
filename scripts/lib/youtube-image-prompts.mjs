const STYLE_DNA = 'universal editorial 2D stickman explainer world, ALL human figures including background people use the same consistent minimalist stickman anatomy, round simple heads, minimal facial features, thin dark limbs and small simplified torsos, no conventional cartoon humans, richer grounded environment, clean dark organic outlines, clear natural object colors, moderate-to-vivid controlled saturation, believable perspective and lighting, simplified 2D materials, variable detail level depending on the scene, educational visual storytelling, coherent visual hierarchy, 16:9';
const NEGATIVE = 'no photorealism, no fully realistic humans, no conventional cartoon humans, no semi-realistic humans, no realistic human anatomy, no mixed human character styles, no countryballs, no 3D/CGI, no anime, no chibi, no gore, no decorative filler, no unnecessary text blocks, do not show information from later narration';

export const buildImagePrompt = (scene) => {
  const number = String(scene.scene).padStart(3, '0');
  const mode = scene.visualMode || 'grounded editorial explainer scene';
  return `Scene ${number}, spoken beat: ${scene.speechSection} VISUAL CONTENT: ${scene.visualTask} MODE: ${mode}. Build one clear 16:9 composition with a single dominant idea and enough edge room for a subtle pan or zoom. For UN council scenes, use a believable horseshoe council chamber and small desk placards or flags for national identity; never turn countries into characters. For historical scenes, use period-appropriate architecture, clothing, documents, vehicles and technology while every visible person remains a minimalist stickman. STYLE DNA: ${STYLE_DNA}. NEGATIVE: ${NEGATIVE}.`;
};

export const buildImagePromptManifest = (scenes) => ({
  styleVersion: 'UNIVERSAL EDITORIAL STICKMAN WORLD v1.1',
  sceneCount: scenes.length,
  prompts: scenes.map((scene) => ({
    scene: scene.scene,
    promptId: scene.promptId || `SCENE-${String(scene.scene).padStart(3, '0')}`,
    speechSection: scene.speechSection,
    visualTask: scene.visualTask,
    prompt: buildImagePrompt(scene),
  })),
});
