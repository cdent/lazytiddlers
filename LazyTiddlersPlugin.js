/***
|''Requires''|TiddlyWebConfig|
***/

//{{{
(function($) {
    var callback = function(context, userParams) {
        if(!context.status) {
            return; // XXX: oughta do something
        }
        var tiddler = context.tiddler;
        var dirty = store.isDirty();
        store.setDirty(false);
        store.saveTiddler(tiddler.title, tiddler.title, tiddler.text,
            tiddler.modifier, tiddler.modified, tiddler.tgags, tiddler.fields,
            false, tiddler.created, tiddler.creator);
        store.setDirty(dirty);
    };

    var adaptor = store.getTiddler('LazyTiddlers').getAdaptor();
    var tiddlers = store.getTiddlerText('LazyTiddlers').split("\n");

    $.each(tiddlers, function(i, tiddler) {
        var tiddler_info = tiddler.split(":");
        var context = {workspace: "bags/" + tiddler_info[0]};
        adaptor.getTiddler(tiddler_info[1], context, null, callback);
    });

})(jQuery);
//}}}
