/*
 * This file is part of the Code::Blocks IDE and licensed under the GNU Lesser General Public License, version 3
 * http://www.gnu.org/licenses/lgpl-3.0.html
 */

#ifndef VALGRINDLISTLOG_H
#define VALGRINDLISTLOG_H

#include <wx/event.h>
#include "loggers.h"

class wxArrayString;
class wxArrayInt;
class wxCommandEvent;
class wxWindow;

class ValgrindListLog : public ListCtrlLogger, public wxEvtHandler
{
public:
	ValgrindListLog(const wxArrayString& Titles, wxArrayInt& Widths);
	~ValgrindListLog();
	wxWindow* CreateControl(wxWindow* Parent);

private:
	void OnDoubleClick(wxCommandEvent& Event);
	void SyncEditor(int selIndex);

	DECLARE_EVENT_TABLE()
};

#endif // VALGRINDLISTLOG_H
