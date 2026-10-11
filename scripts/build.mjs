import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publications = JSON.parse(fs.readFileSync(path.join(root, 'data/publications.json'), 'utf8'));
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const authorText = value => escape(value).replaceAll('Jiacheng Liu', '<strong>Jiacheng Liu</strong>');
const link = (label, href) => `<a href="${escape(href)}">${escape(label)}</a>`;
const labels = {
    zh: {
        lang: 'zh-CN', title: '留嘉城 · Jiacheng Liu', description: '留嘉城，上海交通大学人工智能学院博士生。研究高效多模态生成、交互式世界模型与大语言模型后训练。',
        nav: ['简介', '研究方向', '实习', '项目介绍', '代表项目', '其他论文'],
        affiliation: '上海交通大学 · 人工智能学院 · 博士生',
        bio: '我是<a href="https://www.sjtu.edu.cn/">上海交通大学</a>人工智能学院 2026 级博士生。我的研究围绕生成模型与智能体的效率和能力展开，涵盖高效多模态生成、交互式世界模型，以及大语言模型后训练。',
        opportunities: '欢迎多模态生成、世界模型与 LLM 后训练方向的研究实习和合作交流。',
        research: '研究方向', internships: '实习经历', overview: '项目介绍', projects: '代表项目', others: '其他论文',
        interests: [
            '<strong>高效多模态生成：</strong>扩散模型的特征缓存、推理加速与少步蒸馏。',
            '<strong>交互式世界模型：</strong>指令驱动的视频生成、动作响应与长时序一致性。',
            '<strong>LLM 后训练：</strong>On-Policy Distillation、跨 Tokenizer 知识迁移与多轮 Coding Agent 训练。'
        ],
        experience: [
            ['无尽前沿（Endless Frontier）', '2026.09–至今', 'LLM 基模组 · 后训练实习生 · 上海', '开展 On-Policy Distillation 与异构 MoE 知识蒸馏研究，关注跨模型知识迁移和多轮 Coding Agent 训练。'],
            ['腾讯混元', '2025.07–2026.06', '多模态模型部 · 世界模型基模组 · 青云计划研究实习生 · 上海', '参与 GameCraft-2 的交互视频数据、教师模型 SFT、Self-Forcing / DMD 少步蒸馏、强化学习优化与评测。']
        ],
        overviews: [
            ['高效多模态生成', '围绕扩散模型在图像、视频生成与编辑中的推理成本，研究如何利用跨时间步的特征演化减少冗余计算。从 TaylorSeer 的预测式缓存出发，进一步探索 SpeCa 的预测验证与自适应计算、LESA 的阶段感知可学习预测器，以及 FreqCa 的频域缓存，优化生成质量与推理效率之间的平衡。'],
            ['交互式世界模型', '围绕自然语言指令与玩家动作驱动的视频生成，参与 Hunyuan-GameCraft-2 研发，研究指令跟随、动作响应与长时序交互一致性。工作涵盖交互视频数据清洗与标注、交互记忆教师模型 SFT、少步生成蒸馏与评测；基于 Self-Forcing 与 DMD 开展蒸馏，并结合强化学习优化长程生成稳定性与视觉质量。'],
            ['大语言模型后训练', '围绕大语言模型的知识迁移与多轮智能体学习，开展 On-Policy Distillation 研究，包括 ESCD 跨 Tokenizer 蒸馏、异构 MoE 知识迁移与 MOPD。进一步研究需要推理、调用工具和读取环境反馈的多轮 Coding Agent 任务，围绕 Terminal-Bench 2.0 与 SWE-bench Verified，关注训练效率、监督分配与任务求解能力。']
        ],
        selectedNote: '精选一作 / 共同一作工作。* 表示共同第一作者，† 表示通讯作者。',
        groups: [
            ['高效多模态生成', ['TaylorSeer', 'SpeCa', 'LESA', 'FreqCa']],
            ['交互式世界模型', ['GameCraft-2']],
            ['大语言模型后训练', ['ESCD']]
        ],
        otherNote: '代表项目之外的合作论文、综述与早期研究，按年份展开。',
        roleFirst: '一作', roleEqual: '共同一作', underReview: '在审',
        paper: '论文', code: '代码', project: '项目', footer: '更新于 2026 年 10 月'
    },
    en: {
        lang: 'en', title: 'Jiacheng Liu (留嘉城)', description: 'Jiacheng Liu, Ph.D. student at Shanghai Jiao Tong University. Efficient multimodal generation, interactive world models, and LLM post-training.',
        nav: ['About', 'Research', 'Internships', 'Project Overview', 'Selected Work', 'Other Papers'],
        affiliation: 'Ph.D. Student · School of Artificial Intelligence · SJTU',
        bio: 'I am a first-year Ph.D. student (2026 cohort) at the School of Artificial Intelligence, <a href="https://en.sjtu.edu.cn/">Shanghai Jiao Tong University</a>. My research focuses on the efficiency and capabilities of generative models and agents, spanning efficient multimodal generation, interactive world models, and LLM post-training.',
        opportunities: 'I welcome research internship and collaboration opportunities in multimodal generation, world models, and LLM post-training.',
        research: 'Research Interests', internships: 'Internships', overview: 'Project Overview', projects: 'Selected Projects', others: 'Other Publications',
        interests: [
            '<strong>Efficient multimodal generation:</strong> feature caching, diffusion inference acceleration, and few-step distillation.',
            '<strong>Interactive world models:</strong> instruction-driven video generation, action response, and long-horizon consistency.',
            '<strong>LLM post-training:</strong> on-policy distillation, cross-tokenizer knowledge transfer, and multi-turn coding agents.'
        ],
        experience: [
            ['Endless Frontier', 'Sep 2026–Present', 'LLM Foundation Model Team · Post-training Intern · Shanghai', 'Research on on-policy distillation and heterogeneous MoE distillation, with a focus on cross-model knowledge transfer and multi-turn coding agents.'],
            ['Tencent Hunyuan', 'Jul 2025–Jun 2026', 'World Model Team · Qingyun Research Intern · Shanghai', 'Contributed to GameCraft-2 through interactive video data, teacher-model SFT, Self-Forcing / DMD few-step distillation, reinforcement learning, and evaluation.']
        ],
        overviews: [
            ['Efficient Multimodal Generation', 'I study how feature dynamics across timesteps can reduce redundant computation in diffusion-based image and video generation and editing. Starting with predictive caching in TaylorSeer, my work explores forecast verification and adaptive computation in SpeCa, learnable stage-aware predictors in LESA, and frequency-aware caching in FreqCa to improve the quality–efficiency trade-off.'],
            ['Interactive World Models', 'I contributed to Hunyuan-GameCraft-2, studying video generation controlled by natural-language instructions and player actions, with a focus on instruction following, action response, and long-horizon consistency. My work spans interactive video data cleaning and annotation, interaction-memory teacher-model SFT, few-step distillation, and evaluation, including Self-Forcing / DMD distillation and reinforcement learning for generation stability and visual quality.'],
            ['LLM Post-training', 'I study on-policy distillation for knowledge transfer and multi-turn agents, including cross-tokenizer distillation with ESCD, heterogeneous MoE knowledge transfer, and MOPD. I also investigate multi-turn coding-agent tasks that combine reasoning, tool use, and environment feedback, focusing on training efficiency, supervision allocation, and task-solving capabilities with Terminal-Bench 2.0 and SWE-bench Verified.']
        ],
        selectedNote: 'Selected first-author / co-first-author work. * Equal contribution; † corresponding author.',
        groups: [
            ['Efficient Multimodal Generation', ['TaylorSeer', 'SpeCa', 'LESA', 'FreqCa']],
            ['Interactive World Models', ['GameCraft-2']],
            ['LLM Post-training', ['ESCD']]
        ],
        otherNote: 'Additional collaborations, surveys, and earlier research, grouped by year.',
        roleFirst: 'First author', roleEqual: 'Co-first author', underReview: 'Under review',
        paper: 'Paper', code: 'Code', project: 'Project', footer: 'Updated October 2026'
    }
};

function links(p, l) {
    return (p.links || []).map(item => link(item.type === 'github' ? l.code : item.type === 'project' ? l.project : item.label === 'Paper' ? l.paper : item.label, item.href)).join('');
}

function metadata(p, l) {
    const role = p.role === 'equal' ? l.roleEqual : p.role === 'first' ? l.roleFirst : '';
    return [p.id === 'ESCD' ? 'ESCD' : '', p.venue.replaceAll('Under Review', l.underReview), role].filter(Boolean).map(escape).join(' · ');
}

function work(p, l, language, compact = false) {
    const primary = (p.links || []).find(item => item.type === 'paper') || (p.links || [])[0];
    const title = primary ? link(p.title, primary.href) : escape(p.title);
    const description = p.description?.[language];
    return `<${compact ? 'li' : 'article'} class="${compact ? '' : 'work'}"${compact ? '' : ` id="work-${escape(p.id)}"`}>
        <p class="work-title">${title}</p>
        <p class="work-meta">${metadata(p, l)}${p.authors ? `<br>${authorText(p.authors)}` : ''}</p>
        ${!compact && description ? `<p class="work-description">${escape(description)}</p>` : ''}
        ${p.links?.length ? `<div class="paper-links">${links(p, l)}</div>` : ''}
    </${compact ? 'li' : 'article'}>`;
}

for (const [language, l] of Object.entries(labels)) {
    const ids = ['about', 'research', 'internships', 'project-overview', 'selected-projects', 'other-publications'];
    const selectedIds = new Set(l.groups.flatMap(group => group[1]));
    const otherPapers = publications.filter(p => !selectedIds.has(p.id));
    const years = [...new Set(otherPapers.map(p => p.year))].sort((a, b) => b - a);
    const html = `<!doctype html>
<html lang="${l.lang}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${l.title}</title>
    <meta name="description" content="${escape(l.description)}">
    <link rel="icon" href="favicon.ico">
    <link rel="stylesheet" href="static/css/academic.css">
    <link rel="alternate" hreflang="zh-CN" href="https://tammytcl.github.io/Liu_Homepage/">
    <link rel="alternate" hreflang="en" href="https://tammytcl.github.io/Liu_Homepage/index_en.html">
    <link rel="canonical" href="https://tammytcl.github.io/Liu_Homepage/${language === 'en' ? 'index_en.html' : ''}">
</head>
<body>
<a class="skip-link" href="#about">${language === 'zh' ? '跳到正文' : 'Skip to content'}</a>
<main class="page">
    <div class="topline">
        <nav class="section-nav" aria-label="${language === 'zh' ? '页面导航' : 'Page navigation'}">${l.nav.map((name, i) => link(name, `#${ids[i]}`)).join('')}</nav>
        <nav class="languages" aria-label="Language"><a href="index.html" lang="zh-CN"${language === 'zh' ? ' aria-current="page"' : ''}>中文</a><a href="index_en.html" lang="en"${language === 'en' ? ' aria-current="page"' : ''}>EN</a></nav>
    </div>
    <header id="about">
        <div class="hero">
            <div>
                <h1>Jiacheng Liu <span class="chinese-name">留嘉城</span></h1>
                <p class="affiliation">${l.affiliation}</p>
                <div class="contact">${link('Email', 'mailto:ljc.mytcl@gmail.com')}${link('Google Scholar', 'https://scholar.google.com/citations?user=B4udiEoAAAAJ')}${link('GitHub', 'https://github.com/Tammytcl')}${link(language === 'zh' ? '知乎' : 'Zhihu', 'https://www.zhihu.com/people/ming-yue-tou-chui-lei')}</div>
            </div>
            <img class="portrait" src="static/img/profile.jpg" width="164" height="164" alt="${language === 'zh' ? '留嘉城的现有头像：阳光下的黑猫' : 'Jiacheng Liu’s existing avatar: a black cat in the sunlight'}">
        </div>
        <p class="bio">${l.bio}</p>
        <p class="opportunities">${l.opportunities}</p>
    </header>
    <section id="research" aria-labelledby="research-heading">
        <h2 id="research-heading">${l.research}</h2>
        <ul class="interests">${l.interests.map(item => `<li>${item}</li>`).join('')}</ul>
    </section>
    <section id="internships" aria-labelledby="internships-heading">
        <h2 id="internships-heading">${l.internships}</h2>
        ${l.experience.map(([company, period, role, description]) => `<article class="experience"><div class="experience-heading"><h3>${company}</h3><span class="period">${period}</span></div><p class="role">${role}</p><p>${description}</p></article>`).join('')}
    </section>
    <section id="project-overview" aria-labelledby="overview-heading">
        <h2 id="overview-heading">${l.overview}</h2>
        ${l.overviews.map(([heading, paragraph]) => `<article><h3>${heading}</h3><p>${escape(paragraph)}</p></article>`).join('')}
    </section>
    <section id="selected-projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">${l.projects}</h2>
        <p class="section-note">${l.selectedNote}</p>
        ${l.groups.map(([heading, selected]) => `<h3>${heading}</h3>${selected.map(id => { const p = publications.find(p => p.id === id); if (!p) throw new Error(`Missing selected paper: ${id}`); return work(p, l, language); }).join('')}`).join('')}
    </section>
    <section id="other-publications" aria-labelledby="publications-heading">
        <h2 id="publications-heading">${l.others}</h2>
        <p class="section-note">${l.otherNote}</p>
        ${years.map(year => `<details class="publication-group"><summary>${year}</summary><ol class="publication-list">${otherPapers.filter(p => p.year === year).map(p => work(p, l, language, true)).join('')}</ol></details>`).join('')}
    </section>
    <footer class="footer"><span>Jiacheng Liu · ${link('ljc.mytcl@gmail.com', 'mailto:ljc.mytcl@gmail.com')}</span><span>${l.footer}</span></footer>
</main>
</body>
</html>
`;
    const filename = language === 'zh' ? 'index.html' : 'index_en.html';
    fs.writeFileSync(path.join(root, filename), html.split('\n').map(line => line.trimEnd()).join('\n'));
    console.log(`Built ${filename}: ${selectedIds.size} selected works, ${otherPapers.length} other papers.`);
}
