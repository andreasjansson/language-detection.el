/***************************************************************
 * Name:      ThreadSearch
 * Purpose:   ThreadSearch Code::Blocks plugin
 *            Most of the interactions with C::B are handled here.
 * Author:    Jerome ANTOINE
 * Created:   2007-10-08
 * Copyright: Jerome ANTOINE
 * License:   GPL
 **************************************************************/

#ifndef THREAD_SEARCH_H
#define THREAD_SEARCH_H

#include <wx/string.h>
#include <wx/splitter.h>

#include <cbplugin.h> // for "class cbPlugin"
#include <globals.h> // for "ModuleType"

#include "ThreadSearchFindData.h"
#include "ThreadSearchViewManagerBase.h"
#include "ThreadSearchLoggerBase.h"
#include "InsertIndexManager.h"
#include "codesnippetsevent.h"

class wxBoxSizer;
class wxWindow;
class wxMenu;
class wxMenuBar;
class wxToolBar;
class wxLogWindow;
class wxComboBox;
class FileTreeData;
class wxCommandEvent;
class wxUpdateUIEvent;
class cbAuiNotebook;

class cbConfigurationPanel;
class cbProject;

class ThreadSearchView;
class SnipSearchAppFrame;
class MainPanel;

// ----------------------------------------------------------------------------
class ThreadSearch : public cbPlugin
// ----------------------------------------------------------------------------
{
    friend class ThreadSearchFrame;

private:
	/** Constructor. */
	ThreadSearch();
public:
	/** Constructor. */
	ThreadSearch(wxWindow* parent);

	/** Destructor. */
	virtual ~ThreadSearch();

	/** Invoke configuration dialog. */
	virtual int Configure();

	/** Return the plugin's configuration priority.
	  * This is a number (default is 50) that is used to sort plugins
	  * in configuration dialogs. Lower numbers mean the plugin's
	  * configuration is put higher in the list.
	  */
	virtual int GetConfigurationPriority() const { return 50; }

	/** Return the configuration group for this plugin. Default is cgUnknown.
	  * Notice that you can logically OR more than one configuration groups,
	  * so you could set it, for example, as "cgCompiler | cgContribPlugin".
	  */
	virtual int GetConfigurationGroup() const { return cgContribPlugin; }

	/** Return plugin's configuration panel.
	  * @param parent The parent window.
	  * @return A pointer to the plugin's cbConfigurationPanel. It is deleted by the caller.
	  */
	virtual cbConfigurationPanel* GetConfigurationPanel(wxWindow* parent);

	/** Return plugin's configuration panel for projects.
	  * The panel returned from this function will be added in the project's
	  * configuration dialog.
	  * @param parent The parent window.
	  * @param project The project that is being edited.
	  * @return A pointer to the plugin's cbConfigurationPanel. It is deleted by the caller.
	  */
	virtual cbConfigurationPanel* GetProjectConfigurationPanel(wxWindow* WXUNUSED(parent), cbProject* WXUNUSED(project)){ return 0; }

	/** This method is called by Code::Blocks and is used by the plugin
	  * to add any menu items it needs on Code::Blocks's menu bar.\n
	  * It is a pure virtual method that needs to be implemented by all
	  * plugins. If the plugin does not need to add items on the menu,
	  * just do nothing ;)
	  * @param menuBar the wxMenuBar to create items in
	  */
	virtual void BuildMenu(wxMenuBar* menuBar);

	/** This method is called by Code::Blocks core modules (EditorManager,
	  * ProjectManager etc) and is used by the plugin to add any menu
	  * items it needs in the module's popup menu. For example, when
	  * the user right-clicks on a project file in the project tree,
	  * ProjectManager prepares a popup menu to display with context
	  * sensitive options for that file. Before it displays this popup
	  * menu, it asks all attached plugins (by asking PluginManager to call
	  * this method), if they need to add any entries
	  * in that menu. This method is called.\n
	  * If the plugin does not need to add items in the menu,
	  * just do nothing ;)
	  * @param type the module that's preparing a popup menu
	  * @param menu pointer to the popup menu
	  * @param data pointer to FileTreeData object (to access/modify the file tree)
	  */
	virtual void BuildModuleMenu(const ModuleType type, wxMenu* pMenu, const FileTreeData* data = 0);

	/** This method is called by Code::Blocks and is used by the plugin
	  * to add any toolbar items it needs on Code::Blocks's toolbar.\n
	  * It is a pure virtual method that needs to be implemented by all
	  * plugins. If the plugin does not need to add items on the toolbar,
	  * just do nothing ;)
	  * @param toolBar the wxToolBar to create items on
	  * @return The plugin should return true if it needed the toolbar, false if not
	  */
	virtual bool BuildToolBar(wxToolBar* toolBar);

	/** This method is called to update observers.
	  * The pattern has not been implemented as there is only one observer
	  * (the ThreadSearchView) that already holds a reference on the plugin.
	  */
	void Notify();

	// Setters
	void SetCtxMenuIntegration(bool ctxMenuIntegration)    {m_CtxMenuIntegration = ctxMenuIntegration;}
	void SetUseDefValsForThreadSearch(bool useDefVals)     {m_UseDefValsForThreadSearch = useDefVals;}
	void SetShowSearchControls(bool showSearchControls)    {m_ShowSearchControls = showSearchControls;}
	void SetShowDirControls(bool showDirControls)          {m_ShowDirControls = showDirControls;}
	void SetShowCodePreview(bool showCodePreview)          {m_ShowCodePreview = showCodePreview;}
	void SetDisplayLogHeaders(bool displayLogHeaders)      {m_DisplayLogHeaders = displayLogHeaders;}
	void SetDrawLogLines(bool drawLogLines)                {m_DrawLogLines = drawLogLines;}
	void SetFindData(const ThreadSearchFindData& findData) {m_FindData = findData;}

	void SetManagerType (ThreadSearchViewManagerBase::eManagerTypes mgrType);
	void SetLoggerType (ThreadSearchLoggerBase::eLoggerTypes       lgrType) {m_LoggerType = lgrType;}
	void SetSplitterMode(wxSplitMode                                splitterMode) {m_SplitterMode = splitterMode;}
	void SetFileSorting (InsertIndexManager::eFileSorting           fileSorting)  {m_FileSorting  = fileSorting;}

	// Getters
	bool GetCtxMenuIntegration()                     const {return m_CtxMenuIntegration;}
	bool GetUseDefValsForThreadSearch()              const {return m_UseDefValsForThreadSearch;}
	bool GetShowSearchControls()                     const {return m_ShowSearchControls;}
	bool GetShowDirControls()                        const {return m_ShowDirControls;}
	bool GetShowCodePreview()                        const {return m_ShowCodePreview;}
	bool GetDisplayLogHeaders()                      const {return m_DisplayLogHeaders;}
	bool GetDrawLogLines()                           const {return m_DrawLogLines;}
	void GetFindData(ThreadSearchFindData& findData) const {findData = m_FindData;}
	ThreadSearchFindData& GetFindData()                    {return m_FindData;}
	ThreadSearchViewManagerBase::eManagerTypes GetManagerType() const {return m_pViewManager->GetManagerType();}
	ThreadSearchLoggerBase::eLoggerTypes       GetLoggerType()  const {return m_LoggerType;}
	long                                       GetSplitterMode() const {return m_SplitterMode;}
	InsertIndexManager::eFileSorting           GetFileSorting()  const {return m_FileSorting;}
    wxString GetCodeSnippetsIndex(){return m_CodeSnippetsIndexFilename;}
    void     SplitThreadSearchWindow();
    void     UnsplitThreadSearchWindow();
    void     ResetNotebookSashPosition();
    void     UserResizingWindow(wxSizeEvent &event);

	/** This method runs a threaded search for text param.
	  * @param text : text to look after
	  * @param isCtxSearch : bool that tells if it is a ctx search
	  * to set, if necessary, the default ctx search options
	  */
	void RunThreadSearch(const wxString& text, bool isCtxSearch = false);

	/** This method is a callback called by ThreadSearchView destructor.
	  * Either view is destroyed by C::B InfoPane if plugin is used in
	  * the Messages Notebook or by plugin instance if view is not displayed
	  * or used in the layout.
	  */
	void OnThreadSearchViewDestruction();

	/** This method shows/hide the ThreadSearch toolbar.
	  * @param show : show = true/hide = false toolbar
	  */
	void ShowToolBar(bool show);

	/** Method used to know is toolbar is visible. */
	bool IsToolbarVisible();

	//wxLogWindow*        m_pLog;             //(pecan 2007/7/26)
    //wxWindow*           m_pAppWindow;
	wxFont              m_Conf_font;        //(pecan 2008/3/06)
    wxBoxSizer*         m_pMainSizer;
    MainPanel*          m_pMainPanel;
    wxSplitterWindow*   m_pMainSplitter;
    //-wxTextCtrl*         m_pText;
    cbAuiNotebook*      m_pEdNotebook;
    wxWindow*           m_pThreadSearchViewParentBak;
    wxWindow*           m_pEdNotebookParentBak;
    wxWindow*           m_pParent;           //parent window/frame //(pecan 2008/4/03)
    bool                m_bSashWindowResizing; // Resizing ThreadSearchFrame

protected:
	/** Any descendent plugin should override this virtual method and
	  * perform any necessary initialization. This method is called by
	  * Code::Blocks (PluginManager actually) when the plugin has been
	  * loaded and should attach in Code::Blocks. When Code::Blocks
	  * starts up, it finds and <em>loads</em> all plugins but <em>does
	  * not</em> activate (attaches) them. It then activates all plugins
	  * that the user has selected to be activated on start-up.\n
	  * This means that a plugin might be loaded but <b>not</b> activated...\n
	  * Think of this method as the actual constructor...
	  */
	virtual void OnAttach();

	/** Any descendent plugin should override this virtual method and
	  * perform any necessary de-initialization. This method is called by
	  * Code::Blocks (PluginManager actually) when the plugin has been
	  * loaded, attached and should de-attach from Code::Blocks.\n
	  * Think of this method as the actual destructor...
	  * @param appShutDown If true, the application is shutting down. In this
	  *         case *don't* use Manager::Get()->Get...() functions or the
	  *         behaviour is undefined...
	  */
	virtual void OnRelease(bool appShutDown);

	/** This method loads the plugin configuration from default.conf using
	  * the standard ConfigManager
	  * @param showPanel    : reference that will be true after the call if
	  *                       the panel is managed by the MessageManager during last save.
	  * @param sashPosition : position of the splitter window.
	  * @param mgrType      : type of view manager (Messages notebook, layout)
	  */
	virtual void LoadConfig(bool &showPanel, int &sashPosition,
							ThreadSearchViewManagerBase::eManagerTypes& mgrType,
							wxArrayString& searchPatterns);

	/** This method saves the plugin configuration to default.conf using
	  * the standard ConfigManager
	  * @param ShowPanel :    boolean telling if ThreadSearch panel is managed
	  *                       by the MessageManager.
	  * @param sashPosition : position of the splitter window.
	  * @param mgrType :      Type of view manager (Messages notebook, layout)
	  */
	virtual void SaveConfig(bool showPanel, int sashPosition,
							ThreadSearchViewManagerBase::eManagerTypes mgrType,
							const wxArrayString& searchPatterns);

private:
	/** Event handler called when user clicks on the 'Thread search'
	  * item of the 'View' menu.
	  */
	void OnMnuViewThreadSearch(wxCommandEvent& event);

	/** Event handler called when user clicks on the 'Thread Search'
	  * item of the 'Search' menu.
	  */
	void OnMnuSearchThreadSearch(wxCommandEvent& event);

	/** Event handler called when user clicks on the 'Find occurrences of'
	  * item of the contextual menu.
	  */
	void OnCtxThreadSearch(wxCommandEvent& event);

	/** Event handler called to update the 'Thread search'
	  * item of the View menu. Checked if 'Thread search' panel
	  * is present in the message notebook.
	  */
	void OnMnuViewThreadSearchUpdateUI(wxUpdateUIEvent& event);

	/** Event handler called to update the 'Thread search'
	  * item of the 'Search' menu.
	  */
	void OnMnuSearchThreadSearchUpdateUI(wxUpdateUIEvent& event);

	// Toolbar controls events management
	void OnBtnOptionsClick(wxCommandEvent& event);
	void OnBtnSearchClick (wxCommandEvent& event);
	void OnCboSearchExprEnter(wxCommandEvent &event);

	/** Removes the 'Thread search' item added in BuildMenu method.
	  */
	void RemoveMenuItems();

	/** Internal Method refactored from BuildMenu
	  */
	//-static bool GetCursorWord(wxString& sWord);
	bool GetCursorWord(wxString& sWord);

	/** Adds the 'Find occurrences of' at the right place, ie just after
	  * the 'Find implementation' item if possible
	  */
	int GetInsertionMenuIndex(const wxMenu* const pCtxMenu);

	// The following method are there to make it possible to copy
	// and paste from and to view graphical widgets.
	void OnMnuEditCopy(wxCommandEvent& event);
	void OnMnuEditCopyUpdateUI(wxUpdateUIEvent& event);
    void OnMnuEditPaste(wxCommandEvent& event);

    void OnSashPositionChanged(wxSplitterEvent& event);
    void OnIdle(wxIdleEvent& event);
    void OnCodeSnippetsNewIndex(CodeSnippetsEvent& event);

	// Member variables
	wxString                             m_SearchedWord;              // Word under cursor on right click
	ThreadSearchFindData                 m_FindData;                  // Search structure containing all useful inforamtions
	ThreadSearchView*                    m_pThreadSearchView;         // Panel added to Messages notebook
	ThreadSearchViewManagerBase*         m_pViewManager;              // View manager. Used to add, remove, show and hide view.
										        					  // Used on a derived class (message notebook or layout manager).
	wxToolBar*                           m_pToolbar;                  // Panel added to Messages notebook
	bool                                 m_CtxMenuIntegration;        // Tells if 'Find occurrences' item must be present in contextual menu
	bool                                 m_UseDefValsForThreadSearch; // Tells if default values (whole word = true, match case = true)
										        					  // are used for 'Find occurrences' ctx menu command
    bool                                 m_ShowSearchControls;        // True if user wants to use message tab controls
    bool                                 m_ShowDirControls;           // True if user wants to display directory specific controls
    bool                                 m_ShowCodePreview;           // True if user wants to benefit from code preview
    ThreadSearchLoggerBase::eLoggerTypes m_LoggerType;                // Logger type, can be a list or a tree
    bool                                 m_DisplayLogHeaders;         // Show/Hide column headers in wxListCtrl logger
    bool                                 m_DrawLogLines;              // Draw lines between columns in wxListCtrl logger
    bool                                 m_OnReleased;                // For multiple simultaneous calls of OnRelease
    wxComboBox*                          m_pCboSearchExpr;
    wxSplitMode                          m_SplitterMode;              // Sets vertical or horizontal display for code
                                                                      // preview and search results (logger)
    InsertIndexManager::eFileSorting     m_FileSorting;               // Sorts file by name or by path

    bool                                 m_bSashPositionChanged;      // Last postion of editor notebook sash
    int                                  m_EdNotebookSashPosition;
    wxString                             m_CodeSnippetsIndexFilename; // CodeSnippets Index XML filename

	DECLARE_EVENT_TABLE();
};

#endif // THREAD_SEARCH_H
