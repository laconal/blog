from django.contrib import admin
from .models import Post, Comment
from django.utils.html import format_html, format_html_join
# admin.site.register(Post)
# admin.site.register(Comment)

class CommentInline(admin.StackedInline):
    model = Comment
    extra = 0
    fields = ('author', 'body', 'createdDate')
    readonly_fields = ("author", "body", "createdDate")

class SubMessageInline(admin.TabularInline):
    model = Comment
    fk_name = "parent"
    extra = 0
    verbose_name = "Reply"
    verbose_name_plural = "Replies"

    def get_readonly_fields(self, request, obj = None):
        return [f.name for f in self.model._meta.fields]
        # return super().get_readonly_fields(request, obj)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    def commentCount(self, obj):
        return obj.comments.count()
    
    list_display = ('title', 'author', "commentCount", "createdDate")
    inlines = [CommentInline]

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    def replies(self, obj):
        return obj.subMessages.count()
    list_display = ("id", "post", "author", "body", "replies")
    inlines = [SubMessageInline]