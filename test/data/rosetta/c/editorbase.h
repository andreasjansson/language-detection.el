/*
 * This file is part of the Code::Blocks IDE and licensed under the GNU Lesser General Public License, version 3
 * http://www.gnu.org/licenses/lgpl-3.0.html
 */

#ifndef EDITORBASE_H
#define EDITORBASE_H

#include <wx/hashmap.h>
#include <wx/frame.h>
#include <wx/panel.h>
#include "globals.h"
#include "settings.h"
#include "cbexception.h"

class wxMenu;
class EditorBase;
struct EditorBaseInternalData;

WX_DECLARE_HASH_MAP(int, EditorBase*, wxIntegerHash, wxIntegerEqual, SwitchToMap);

/** @brief Base class that all "editors" should inherit from.
  *
  * @note This class descends from wxPanel, so it provides all wxPanel methods
  * as well...
  */
class DLLIMPORT EditorBase : public wxPanel
{
    DECLARE_EVENT_TABLE()
    public:
        EditorBase(wxWindow* parent, const wxString& filename);
        virtual ~EditorBase();

        /** Don't use this. It throws an exception if you do. */
        EditorBase(const EditorBase& rhs) { cbThrow(_T("Can't call EditorBase's copy ctor!!!")); }

        /** Don't use this. It throws an exception if you do. */
        virtual void operator=(const EditorBase& rhs){ cbThrow(_T("Can't assign an EditorBase* !!!")); }

        /** @brief Get the editor's filename (if applicable).
          *
          * @return The editor's filename.
          */
        virtual const wxString& GetFilename() const { return m_Filename; }

        /** @brief Sets the editor's filename.
          * @param filename The filename to set.
          */
        virtual void SetFilename(const wxString& filename){ m_Filename = filename; }

        /** @brief Returns the editor's short name.
          *
          * This is the name displayed on the editor's tab...
          *
          * Synonym to GetTitle().
          */
        virtual const wxString& GetShortName() const { return m_Shortname; }

        /** @brief Is it modified?
          *
          * @return true If editor is modified, false otherwise.
          * @note This function should always be overriden by implementations
          *       because the default implementation in EditorBase always
          *       returns false.
          */
        virtual bool GetModified() const { return false; }

        /** @brief Set the modification status.
          *
          * @param modified If true, mark as modified. If false, mark as clean (unmodified).
          */
        virtual void SetModified(bool modified = true) {}

        /** @brief The editor's title.
          *
          * @return The editor's title.
          */
        virtual const wxString& GetTitle();

        /** @brief Set the editor's title.
          *
          * @param newTitle The new title to set.
          */
        virtual void SetTitle(const wxString& newTitle);

        /** @brief Activate this editor.
          *
          * Causes this editor to be activated, i.e. brought to front.
          */
        virtual void Activate();

        /** @brief Can this be closed (destroyed)?
          *
          * This is used internally and queries the editor if it is safe to
          * close it (i.e. it is not modified).
          * @return True if this editor can be closed.
          */
        virtual bool QueryClose(){ return true; }

        /** @brief Close this editor.
          *
          * The default implementation closes (destroys) the editor and returns true.
          * @return True if editor closed succesfully
          */
        virtual bool Close();

        /** @brief Save contents.
          *
          * Save the editor's contents. The default implementation does nothing
          * and returns true.
          * @return True on success, false otherwise. */
        virtual bool Save() { return true; }

        /** @brief Save editor contents under a different filename.
          *
          * Save editor contents under a different filename.
          * The default implementation does nothing and returns true.
          * @return True on success, false otherwise. */
        virtual bool SaveAs() { return true; }

        /** @brief Is this a built-in editor?
          *
          * Query if this is a built-in editor (a.k.a cbEditor).
          * @return True if it is a cbEditor, false otherwise.
          */
        virtual bool IsBuiltinEditor() const;

        /** @brief Are there other editors besides this?
          * @return True if there are more editors open, false otherwise.
          */
        virtual bool ThereAreOthers() const;

        /** @brief Display context menu.
          *
          * Displays the editor's context menu. This is called automatically
          * if the user right-clicks in the editor area.
          * @param position The position to popup the context menu.
          * @param type The module's type.
          */
        virtual void DisplayContextMenu(const wxPoint& position, ModuleType type = mtUnknown);

        /** Should this kind of editor be visible in the open files tree?
          *
          * There are rare cases where an editor should not be visible in the
          * open files tree. One such example is the "Start here" page...
          *
          * @return True if it should be visible in the open files tree, false
          *         if not.
          */
        virtual bool VisibleToTree() const { return true; }

        /** Move the caret at the specified line.
          *
          * @param line The line to move the caret to.
          * @param centerOnScreen If true, the line in question will be in the center
          *                       of the editor's area (if possible). If false,
          *                       it will be just made visible.
          */
        virtual void GotoLine(int line, bool centerOnScreen = true){}

        /** Toggle breakpoint at specified line.
          * @param line The line to toggle the breakpoint on. If @c line is -1,
          *             use current line.
          * @param notifyDebugger If true (and a debugger plugin is loaded),
          *                       tell the debugger about this breakpoint.
          */
        virtual void ToggleBreakpoint(int line = -1, bool notifyDebugger = true){}

        /** Does @c line has breakpoint?
          * @param line The line to check for breakpoint existence.
          * @return True if there is a breakpoint on this line, false if not.
          */
        virtual bool HasBreakpoint(int line) const { return false; }

        /** Go to next breakpoint. */
        virtual void GotoNextBreakpoint(){}

        /** Go to previous breakpoint. */
        virtual void GotoPreviousBreakpoint(){}

        /** Toggle bookmark at specified line.
          * @param line The line to toggle the bookmark on. If @c line is -1,
          *             use current line.
          */
        virtual void ToggleBookmark(int line = -1){}

        /** Does @c line has bookmark?
          * @param line The line to check for bookmark existence.
          * @return True if there is a bookmark on this line, false if not.
          */
        virtual bool HasBookmark(int line) const { return false; }

        /** Go to next bookmark. */
        virtual void GotoNextBookmark(){}

        /** Go to previous bookmark. */
        virtual void GotoPreviousBookmark(){}

        /** @brief Mark the debugger's active line.
          *
          * Highlight the line the debugger will execute next.
          * @param line The line in question.
          */
        virtual void SetDebugLine(int line){}

        /** @brief Mark line as error.
          *
          * Highlight the specified line as compiler error.
          * @param line The line in question.
          */
        virtual void SetErrorLine(int line){}

        /** Undo changes. */
        virtual void Undo(){}

        /** Redo changes. */
        virtual void Redo(){}

        /** Clear Undo- (and Changebar-) history */
        virtual void ClearHistory(){}

        /** Goto next changed line */
        virtual void GotoNextChanged(){}

        /** Goto previous changed line */
        virtual void GotoPreviousChanged(){}

        /** Enable or disable changebar */
        virtual void SetChangeCollection(bool collectChange){}

        /** Cut selected text/object to clipboard. */
        virtual void Cut(){}

        /** Copy selected text/object to clipboard. */
        virtual void Copy(){}

        /** Paste selected text/object from clipboard. */
        virtual void Paste(){}

        /** Is there something to undo?
          *
          * @return True if there is something to undo, false if not.
          */
        virtual bool CanUndo() const { return false; }

        /** Is there something to redo?
          *
          * @return True if there is something to redo, false if not.
          */
        virtual bool CanRedo() const { return false; }

        /** Is there a selection?
          *
          * @return True if there is text/object selected, false if not.
          */
        virtual bool HasSelection() const { return false; }

        /** Is there something to paste?
          *
          * @return True if there is something to paste, false if not.
          */
        virtual bool CanPaste() const { return false; }

        /** Is the editor read-only?
          *
          * @return True if the editor is read-only, false if not.
          */
        virtual bool IsReadOnly() const { return false; }

        /** Can the editor select everything?
          *
          * @return True if the editor can select all content, false if not.
          */
        virtual bool CanSelectAll() const { return false; }

        /** Select everything in the editor
          */
        virtual void SelectAll() { return; }

        /** Is there a context (right click) menu open
          *
          * @return True if a context menu is open, false if not.
          */
        virtual bool IsContextMenuOpened() const;
    protected:
        /** Initializes filename data.
          * @param filename The editor's filename for initialization.
          */
        virtual void InitFilename(const wxString& filename);

        /** Creates context submenus. See cbEditor code for details.
          * @param id An event handler's ID.
          * @return The created submenu or NULL if not applicable.
          */
        virtual wxMenu* CreateContextSubMenu(int id); // For context menus

        /** Creates context menu items, both before and after creating plugins menu items.
          * @param popup The popup menu.
          * @param type The module's type.
          * @param pluginsdone True if plugin menus have been created, false if not.
          */
        virtual void AddToContextMenu(wxMenu* popup, ModuleType type, bool pluginsdone) {}

        /** Creates unique filename when asking to save the file.
          * @return A unique filename suggestion.
          */
        virtual wxString CreateUniqueFilename();

        /** Informs the editor we 're just about to create a context menu.
          * Default implementation, just returns true.
          * @param position specifies the position of the popup menu.
          * @param type specifies the "ModuleType" popup menu.
          * @return If the editor returns false, the context menu creation is aborted.
          */
        virtual bool OnBeforeBuildContextMenu(const wxPoint& position, ModuleType type){ return true; }

        /** Informs the editor we 're done creating the context menu (just about to display it).
          * Default implementation does nothing.
          * @param type specifies the "ModuleType" context popup menu.
          */
        virtual void OnAfterBuildContextMenu(ModuleType type){}

        bool m_IsBuiltinEditor; // do not mess with it!
        wxString m_Shortname;
        wxString m_Filename;
        EditorBaseInternalData* m_pData; ///< Use this to add new vars/functions w/out breaking the ABI
    private:

        /** one event handler for all popup menu entries */
        void OnContextMenuEntry(wxCommandEvent& event);
        void BasicAddToContextMenu(wxMenu* popup, ModuleType type); //pecan 2006/03/22
        SwitchToMap m_SwitchTo;
        wxString m_WinTitle;
        wxString lastWord;
};

#endif // EDITORBASE_H
