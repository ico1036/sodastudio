# workflow_state.md
_Last updated: 2025-01-16_

## State
Phase: VALIDATE
Status: COMPLETED
CurrentItem: null

## Plan
<!-- The plan has been successfully executed. -->

## Rules
> **Keep every major section under an explicit H2 (`##`) heading so the agent can locate them unambiguously.**

### [PHASE: ANALYZE]
1. Read **project_config.md**, relevant code & docs.  
2. Summarize requirements. *No code or planning.*

### [PHASE: BLUEPRINT]
1. Decompose task into ordered steps.  
2. Write pseudocode or file-level diff outline under **## Plan**.  
3. Set `Status = NEEDS_PLAN_APPROVAL` and await user confirmation.

### [PHASE: CONSTRUCT]
1. Follow the approved **## Plan** exactly.  
2. After each atomic change:  
   - run test / linter commands specified in `project_config.md`  
   - capture tool output in **## Log**  
3. On success of all steps, set `Phase = VALIDATE`.

### [PHASE: VALIDATE]
1. Rerun full test suite & any E2E checks.  
2. If clean, set `Status = COMPLETED`.  
3. Trigger **RULE_ITERATE_01** when applicable.
4. Trigger **RULE_GIT_COMMIT_01** to prompt for version control.

---

### RULE_INIT_01
Trigger ▶ `Phase == INIT`  
Action ▶ Ask user for first high-level task → `Phase = ANALYZE, Status = RUNNING`.

### RULE_ITERATE_01
Trigger ▶ `Status == COMPLETED && Items contains unprocessed rows`  
Action ▶  
1. Set `CurrentItem` to next unprocessed row in **## Items**.  
2. Clear **## Log**, reset `Phase = ANALYZE, Status = READY`.

### RULE_LOG_ROTATE_01
Trigger ▶ `length(## Log) > 5 000 chars`  
Action ▶ Summarise the top 5 findings from **## Log** into **## ArchiveLog**, then clear **## Log**.

### RULE_SUMMARY_01
Trigger ▶ `Phase == VALIDATE && Status == COMPLETED`  
Action ▶ 
1. Read `project_config.md`.
2. Construct the new changelog line: `- <One-sentence summary of completed work>`.
3. Find the `## Changelog` heading in `project_config.md`.
4. Insert the new changelog line immediately after the `## Changelog` heading and its following newline (making it the new first item in the list).

---

### Git Workflow
> Rules for interacting with the Git version control system.

#### RULE_GIT_COMMIT_01
Trigger ▶ `Phase == VALIDATE && Status == COMPLETED`  
Action ▶ 
1. Prompt user to commit changes with a generated message (e.g., `Phase X: [brief description]`).
2. Suggest creating a new branch for significant changes (e.g., `git checkout -b feature/new-thing`).
3. Upon user confirmation, execute the `git add .` and `git commit` commands.
4. Retrieve the new commit SHA using `git rev-parse HEAD`.
5. Prepend the SHA and commit message to `## Workflow History`.

#### RULE_GIT_ROLLBACK_01
Trigger ▶ User command like "revert to..." or "rollback to..." followed by a description.
Action ▶ 
1. Search `## Workflow History` for the SHA corresponding to the description.
2. If found, execute `git checkout <SHA>`.
3. If not found, inform the user.

#### RULE_GIT_DIFF_01
Trigger ▶ User command like "diff..." or "compare..." with two descriptions.
Action ▶ 
1. Find the two SHAs from `## Workflow History` based on the descriptions.
2. If found, execute `git diff <SHA1> <SHA2>`.
3. If not found, inform the user.

#### RULE_GIT_GUIDANCE_01
Trigger ▶ User asks for help with Git (e.g., "how do I use git?").
Action ▶ Provide a brief list of common Git commands (`commit`, `branch`, `checkout`, `diff`).

---

## Items
| id | description | status |
|----|-------------|--------|

## Log
- **프로젝트 초기화:** Astro 프레임워크를 사용하여 'soda-studio' 프로젝트의 뼈대를 생성함.
- **기본 레이아웃 구축:** 모든 페이지의 공통 상단(헤더) 및 하단(푸터)을 포함하는 `Layout.astro`를 제작함.
- **스타일링:** 원본 웹사이트 디자인에 맞춰 `global.css` 파일을 작성하고, 전체적인 색상, 폰트, 레이아웃을 정밀하게 복제함.
- **메인 페이지 완성:** 이미지 교체가 용이하도록 `index.astro` 페이지에 대표 이미지 섹션을 구현함.
- **콘텐츠 시스템 구축:** '안내사항'을 쉽게 추가/관리할 수 있도록 `src/content/notices` 폴더와 콘텐츠 형식을 정의하는 `config.ts`를 설정함.
- **콘텐츠 페이지 생성:**
    - `notice.astro`: '안내사항' 폴더의 글을 자동으로 목록화하여 보여주는 페이지 생성.
    - `zone.astro`: 'Zone 소개'에 대한 정적 콘텐츠 페이지 생성.
    - `location.astro`: 지도와 주소를 보여주는 '오시는길' 페이지 생성.
- **작업 완료:** 모든 핵심 기능 구현을 마치고 개발 서버를 통해 최종 결과물 확인.

## Workflow History
<!-- RULE_GIT_COMMIT_01 stores commit SHAs and messages here -->

## ArchiveLog
<!-- RULE_LOG_ROTATE_01 stores condensed summaries here -->
