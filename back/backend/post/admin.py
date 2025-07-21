from django.contrib import admin
from .models import Post, Comment

# admin.site.register(Post)
admin.site.register(Comment)

class CommentInline(admin.StackedInline):
    model = Comment
    extra = 0
    fields = ('author', 'body', 'createdDate')
    readonly_fields = ("author", "body", "createdDate")


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    def commentCount(self, obj):
        return obj.comments.count()
    
    list_display = ('title', 'author', "commentCount", "createdDate")
    inlines = [CommentInline]

    

    