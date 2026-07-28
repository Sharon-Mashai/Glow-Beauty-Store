# GlowBeauty Store

This is a cosy little bookmark manager I built so I could stop losing track of all the skincare and beauty products I want to try.

Stash links to your favourite cleansers, moisturisers, sunscreens, and everything in between — each with a description and handy tags. Everything lives right in your browser, so no accounts, no sign-ups, no fuss. Just a pretty place for your product wishlist.

## What it actually does

- **Save products you love** — Drop in a link, give it a name, write down why it's on your radar, and tag it however you like.
- **Edit whenever** — Tried a product and changed your mind? Swapped your skincare routine? Tweak any bookmark in a couple of clicks.
- **Delete (carefully)** — No mistake-moments here. Before anything gets binned, you'll get a gentle "are you sure?" prompt.
- **Find things fast** — The search box hunts through titles, URLs, descriptions, and tags all at once. Even vaguely remember something? You'll probably find it.
- **Click to read more** — Lengthy product thoughts are tucked away by default so the grid stays clean. Click a description to expand it, click again to tuck it back.
- **Draft-saving safety net** — Halfway through typing a review and get distracted? Close the form and it'll remember what you wrote. Next time you open it, pick up where you left off or wipe the slate clean.
- **No backend needed** — Everything is stored in your browser's localStorage. Your shelf stays on your device.
- **Works everywhere** — Looks just as nice on your phone while you're browsing Sephora in the queue as it does on your desktop. Breakpoints all the way down to tiny screens.
- **Feels good to use** — Dark and moody vibe with a soft glassy look, cards that lift when you hover them, and a friendly empty-state illustration that greets you when it's new.

## What is under the hood

— just modern tools that make the dev experience nice:                                 

1. Interface       > React                                      
2. Types           > TypeScript                         |
3. Bundling        > Vite  — it's fast                           
4. Icons           > Hugeicons (the free core set + React wrapper)
5. Style           > Plain CSS in `global.css` and `App.css`  
6. Storage         > Your browser's localStorage                  

## Folders and files

```
src/
Components/
- AddLinkForm.tsx   — The pop-up form for new and edited bookmarks. Also handles the draft-resume prompt.
- BookmarkCard.tsx   — One individual product card. Expandable text, edit + delete buttons in the corner.
- BookmarkGrid.tsx   — The responsive grid where everything lives. Also handles the "empty shelf" and "no search results" screens.
- DeleteModal.tsx      — The polite double-check popup before you delete anything.
-Sidebar.tsx          — The little GlowBeauty branding header.
-Topbar.tsx           — Top bar with the logo, search box, and that big Add Bookmark button.

 assets/
 -images/
IllustrationImage.png  — The friendly little illustration you see when there are zero bookmarks saved.

types/
- Link.tsx             — The TypeScript shape for a bookmark (title, url, description, tags, etc.)

-App.css               — A few app-specific styles
-App.tsx               — The main component — holds all the state and wires everything together
-global.css            — Most of the styling lives here, including all the responsive rules
-main.tsx              — The entry point that mounts the React app
```

## The bookmark shape

Every product you save is a `Link` object (defined in [Link.tsx](src/types/Link.tsx)) that looks like this:

```typescript
export interface Link {
  id: number;
  title: string;
  url: string;
  description: string;
  tags: string[];
}
```

Pretty self-explanatory — tags come through as an array so searching and filtering is a breeze.

## A little walkthrough

1. **Add your first product** — Hit the **Add Bookmark** button up top (or the big friendly button on the empty screen). You'll fill in:
   - **Product Title** — whatever you want to call it (e.g. "The Ordinary Niacinamide 10% + Zinc 1%")
   - **Website URL** — the product page link
   - **Description** — your notes: skin-type, how it felt, repurchase? First-impressions, anything goes
   - **Tags** — comma-separated, anything helpful (e.g. `serum, oily-skin, affordable`)
2. **Search through your shelf** — Just start typing in the search box. It looks through titles, links, your notes, and tags all at once.
3. **Fix a typo / update a note** — Click the little pencil icon on any card.
4. **Toss something out** — Trash icon → confirm → gone.
5. **Expand long descriptions** — See a description that got cut off? Click it to read the whole thing, click again to collapse.
6. **Resume or restart** — If you start typing a bookmark and get pulled away, the app remembers. When you come back, it'll ask if you want to keep going with that draft or start with a blank form.

## localStorage keys                                                                        

- `bookmarks`            > Your whole shelf — the full array of saved `Link` objects                 
- `glowBeauty_formDraft` > Any in-progress add/edit that you haven't submitted or cancelled yet      



